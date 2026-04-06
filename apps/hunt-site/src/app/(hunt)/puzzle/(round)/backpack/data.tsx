import background from "./backpack.png";
export { background };

export const roundName = "Backpack";

import anthropology_of_computers_black from "./icons-black/anthropology-of-computers.png";
import applied_criminology_black from "./icons-black/applied-criminology.png";
import bar_exam_black from "./icons-black/bar-exam.png";
import cubist_linguistics_black from "./icons-black/cubist-linguistics.png";
import geographical_textiles_black from "./icons-black/geographical-textiles.png";
import luck_practicum_black from "./icons-black/luck-practicum.png";
import maritime_studies_black from "./icons-black/maritime-studies.png";
import psychoceramics_black from "./icons-black/psychoceramics.png";
import theological_chemistry_black from "./icons-black/theological-chemistry.png";
import thermodynamic_zoology_black from "./icons-black/thermodynamic-zoology.png";
import underwater_basketweaving_black from "./icons-black/underwater-basketweaving.png";

import anthropology_of_computers_color from "./icons-color/anthropology-of-computers.png";
import applied_criminology_color from "./icons-color/applied-criminology.png";
import bar_exam_color from "./icons-color/bar-exam.png";
import cubist_linguistics_color from "./icons-color/cubist-linguistics.png";
import geographical_textiles_color from "./icons-color/geographical-textiles.png";
import luck_practicum_color from "./icons-color/luck-practicum.png";
import maritime_studies_color from "./icons-color/maritime-studies.png";
import psychoceramics_color from "./icons-color/psychoceramics.png";
import theological_chemistry_color from "./icons-color/theological-chemistry.png";
import thermodynamic_zoology_color from "./icons-color/thermodynamic-zoology.png";
import underwater_basketweaving_color from "./icons-color/underwater-basketweaving.png";

import { type PuzzleIcon } from "../DefaultRoundPage";

export const icons: Record<string, PuzzleIcon> = {
  "anthropology-of-computers": {
    icon: anthropology_of_computers_black,
    x: 56.9444,
    y: 78.4314,
    w: 8.7037,
    h: 8.3946,
    solveIcon: anthropology_of_computers_color,
  },
  "applied-criminology": {
    icon: applied_criminology_black,
    x: 25.4167,
    y: 74.6324,
    w: 6.713,
    h: 9.1299,
    solveIcon: applied_criminology_color,
  },
  "bar-exam": {
    icon: bar_exam_black,
    x: 35.463,
    y: 56.0661,
    w: 6.8981,
    h: 16.6054,
    solveIcon: bar_exam_color,
  },
  "cubist-linguistics": {
    icon: cubist_linguistics_black,
    x: 36.5278,
    y: 18.1373,
    w: 5.787,
    h: 9.1299,
    solveIcon: cubist_linguistics_color,
  },
  "geographical-textiles": {
    icon: geographical_textiles_black,
    x: 40.3241,
    y: 71.0785,
    w: 7.4074,
    h: 9.4975,
    solveIcon: geographical_textiles_color,
  },
  "luck-practicum": {
    icon: luck_practicum_black,
    x: 26.1111,
    y: 34.4975,
    w: 5.8333,
    h: 8.6398,
    solveIcon: luck_practicum_color,
  },
  "maritime-studies": {
    icon: maritime_studies_black,
    x: 23.1019,
    y: 53.2475,
    w: 6.713,
    h: 7.3529,
    solveIcon: maritime_studies_color,
  },
  psychoceramics: {
    icon: psychoceramics_black,
    x: 61.0648,
    y: 26.4093,
    w: 6.2037,
    h: 8.3946,
    solveIcon: psychoceramics_color,
  },
  "theological-chemistry": {
    icon: theological_chemistry_black,
    x: 58.2407,
    y: 57.0466,
    w: 5.6481,
    h: 7.4755,
    solveIcon: theological_chemistry_color,
  },
  "thermodynamic-zoology": {
    icon: thermodynamic_zoology_black,
    x: 67.9167,
    y: 55.9436,
    w: 6.25,
    h: 8.8848,
    solveIcon: thermodynamic_zoology_color,
    labelPosition: "top",
  },
  "underwater-basketweaving": {
    icon: underwater_basketweaving_black,
    x: 49.213,
    y: 16.3602,
    w: 6.0648,
    h: 8.7622,
    solveIcon: underwater_basketweaving_color,
    labelPosition: "top",
  },
};
