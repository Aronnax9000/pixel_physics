
const VON_NEUMANN_NEIGHBORHOOD = [
  // Row 0
  [
     [[0,1],[1,0]], // 0,0
     [[0,0],[0,2], [1,1]], // 0,1
     [[0,1],[1,2]] // 0,2
  ],[
  // Row 1
     [[0,0],[1,1],[2,0]], 
  [[0,1],[1,0],[1,2],[2,1]],
  [[0,2],[1,1],[2,2]]
  ],[
      // Row 2
  [[1,0],[2,1]],
  [[1,1],[2,0],[2,2]],
  [[1,2],[2,1]]
  ]];
  
  
  
  const PIXEL_FIELD_LINES = [
  "0+- +0- +-0 -+0 -0+ 0-+",
  "+-0 -+0 -0+ 0-+ 0+- +0-",
  "-0+ 0-+ 0+- +0- +-0 -+0",
  "0+- +0- +-0 -+0 -0+ 0-+",
  "-0+ 0-+ 0+- +0- +-0 -+0",
  "+-0 -+0 -0+ 0-+ 0+- +0-",
  "-0+ 0-+ 0+- +0- +-0 -+0",
  "0+- +0- +-0 -+0 -0+ 0-+",
  "+-0 -+0 -0+ 0-+ 0+- +0-",
  "-0+ 0-+ 0+- +0- +-0 -+0",
  "+-0 -+0 -0+ 0-+ 0+- +0-",
  "0+- +0- +-0 -+0 -0+ 0-+",
  "+-0 -+0 -0+ 0-+ 0+- +0-",
  "-0+ 0-+ 0+- +0- +-0 -+0",
  "0+- +0- +-0 -+0 -0+ 0-+",
  "+-0 -+0 -0+ 0-+ 0+- +0-",
  "0+- +0- +-0 -+0 -0+ 0-+",
  "-0+ 0-+ 0+- +0- +-0 -+0"
  ];
  

class Pixel6x6 {
  constructor() {
    this.matrix = [];
    for(row = 0; row < 6; row++) {
      let matrixrow = [];
      this.matrix.push(matrixrow);
      for(column = 0; column < 6; column++) {
        pixel3x3 = new Pixel3x3(row,column);
        matrixrow.push(pixel3x3);
      }
    }
  }
/**
 * 
 * @param {*} stringArray an array of 18 strings of 18 -0+ symbols, whitespace is stripped. 
 */
  initFromStringArray(stringArray) {
    rawString = stringArray.join("").replaceAll(" ", "");
    for(row = 0; row < 6; row++) {
      for(column = 0; column < 6; column++) {
        let matrix3x3 = this.matrix[row][column].matrix;
        for(r = 0; r < 3; r++) {
          for(c = 0; c < 3; c++) {
            let index = row * 18 + column * 6 + r * 3 + c;
            matrix3x3[r][c] = rawString.substring(index, index + 1);
          }
        }
      }
    }
  }
}

class Pixel3x3 {
  constructor(row, column) {
    this.matrix = [];
    this.row = row;
    this.column = column;
  }

  charge(field3x3) {
      let q = 0;
      for(i = 0; i < 3; i++) {
          for(j = 0; j < 3; j++) {
              switch(field3x3[i][j]) {
                  case '-': q -= 1; break;
                  case '+': q += 1; break;
                  default: break; // unchanged
              }
          }
      }
      return q;
  }
 
}
