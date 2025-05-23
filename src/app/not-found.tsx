export default function NotFound() {
  return (
    <body className="bg-main-bg bg-gradient-to-t from-[#872C3E] to-main-bg text-main-text">
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-4xl font-bold text-main-header">404</h1>
        <p className="text-lg">Page not found. This is not a puzzle.</p>
        <a href="/" className="text-link hover:underline">
          Go back home
        </a>
      </div>
    </body>
  );
}
