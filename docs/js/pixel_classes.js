class Pixel3x3 {
  constructor() {
    this.matrix = [];
  }

    charge(field3x3) {
        var total = 0;
        for(i = 0; i < 3; i++) {
            for(j = 0; j < 3; j++) {
                switch(field3x3[i][j]) {
                    case '-': total -= 1; break;
                    case '+': total += 1; break;
                    default: break; // unchanged
                }
            }
        }
        return total;
    }
 
}
