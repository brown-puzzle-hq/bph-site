from PIL import Image, ImageFilter
import numpy as np
import io
import os

def resize_to_target_size(image, target_size_kb=100, quality=85):
    """Downscale image to approximately target_size_kb (in KB) while maintaining aspect ratio."""
    target_size = target_size_kb * 1024  # Convert KB to Bytes
    width, height = image.size
    scale_factor = 1.0

    while True:
        # Resize the image with the current scale factor
        new_size = (int(width * scale_factor), int(height * scale_factor))
        resized_img = image.resize(new_size, Image.LANCZOS)

        # Save to in-memory buffer
        img_buffer = io.BytesIO()
        resized_img.save(img_buffer, format="PNG", optimize=True)
        img_size = img_buffer.tell()

        if img_size <= target_size or scale_factor <= 0.1:
            return resized_img  # Return resized image if within limit

        # Reduce scale factor iteratively
        scale_factor *= 0.9

def add_white_border(input_path, output_path, border_size=10):
    # Load image with transparency (RGBA mode)
    img = Image.open(input_path).convert("RGBA")
    img = resize_to_target_size(img, target_size_kb=100)
    img_data = np.array(img)

    # Extract alpha channel (transparency)
    alpha_channel = img_data[:, :, 3]

    # Create a mask of non-transparent pixels
    object_mask = alpha_channel > 0

    # Create a blank border mask
    border_mask = np.zeros_like(alpha_channel)

    # Expand the edges of the object (dilation)
    from scipy.ndimage import binary_dilation
    dilated_mask = binary_dilation(object_mask, iterations=border_size)

    # Find border area (difference between dilated mask and original object)
    border_mask[dilated_mask] = 255
    border_mask[object_mask] = 0  # Keep original object unaltered

    # Create a new white border image
    border_img = Image.new("RGBA", img.size, (255, 255, 255, 0))
    border_data = np.array(border_img)
    border_data[:, :, :3] = 255  # White color
    border_data[:, :, 3] = border_mask  # Apply border transparency

    # Convert back to image
    border_img = Image.fromarray(border_data)

    # Composite the original image on top of the border
    result = Image.alpha_composite(border_img, img)

    # Save output
    result.save(output_path, format="PNG")
    print(f"Saved bordered image to {output_path}")

# Example usage
for filename in set(os.listdir("sprites")).difference(os.listdir("sprites-outlined")):
    _, ext = os.path.splitext(filename)
    if (ext == ".png"):
        add_white_border(f"sprites/{filename}", f"sprites-outlined/{filename}")
    else:
        print(f"Skipping file {filename}")