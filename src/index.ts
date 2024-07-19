/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.css";
import { SudokuCell, SudokuGrid, SudokuRow } from "./types";

class Sudoku {
  private grid: SudokuGrid;
  private sudokuSize = 9;

  private generateEmptyGrid(): SudokuGrid {
    return Array(9).fill(Array<SudokuCell>(9).fill(0)) as SudokuGrid;
  }

  constructor(grid?: SudokuGrid) {
    if (grid && !this.validateFormat(grid)) {
      throw new Error("Invalid grid");
    }

    this.grid = grid ? grid : this.generateEmptyGrid();
  }

  validateFormat(grid: SudokuGrid): boolean {
    if (grid.length !== this.sudokuSize) {
      return false;
    }

    for (const row of grid) {
      if (row.length !== this.sudokuSize) {
        return false;
      }
    }

    return true;
  }

  rowIsValid(row: number): boolean {
    const set = new Set<SudokuCell>(this.grid[row]);
    return set.size === this.sudokuSize;
  }

  columnAsArray(column: number): SudokuRow {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  outputGrid(): void {}

  canInsertValue(
    row: number,
    column: number,
    value: SudokuCell
  ): [boolean, string] {
    let errorMsg = "";

    if (value < 0 || value > 9) {
      errorMsg = "Invalid value";
    }

    if (row < 0 || row >= this.sudokuSize) {
      errorMsg = "Invalid row";
    }

    if (column < 0 || column >= this.sudokuSize) {
      errorMsg = "Invalid column";
    }

    if (this.grid[row][column] !== 0) {
      errorMsg = "Cell already filled";
    }

    return [errorMsg === "", errorMsg];
  }

  // Parse some standard ways sudoku grids might be formatted.
  parser(grid: string): SudokuGrid {}

  setCell(row: number, column: number, value: SudokuCell): void {
    const [canInsert, error] = this.canInsertValue(row, column, value);
    if (!canInsert) throw new Error(error);
    this.grid[row][column] = value;
  }
}
