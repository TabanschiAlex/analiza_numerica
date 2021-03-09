var Seidel = /** @class */ (function () {
    function Seidel(eps) {
        this.matrixA = [
            [72, 2, 4, 2, 5, 1],
            [3, 73, 1, 3, 1, 2],
            [4, 1, 74, 1, 2, 3],
            [1, 3, 2, 75, 3, 4],
            [2, 1, 1, 3, 74, 5]
        ];
        this.B = [0, 0, 0, 0, 0];
        this.eps = eps;
        this.resolve();
    }
    Seidel.prototype.init = function () {
        for (var i = 0; i < this.matrixA.length; i++) {
            var temp = [];
            for (var j = 0; j < this.matrixA.length; j++) {
                temp.push(this.matrixA[i][j]);
            }
            console.log(temp);
        }
    };
    Seidel.prototype.pivot = function () {
        for (var i = 0; i < this.matrixA.length; i++) {
            for (var k = i + 1; k < this.matrixA.length; k++) {
                if (Math.abs(this.matrixA[i][i]) < Math.abs(this.matrixA[k][i])) {
                    for (var j = 0; j <= this.matrixA.length; j++) {
                        var temp = this.matrixA[i][j];
                        this.matrixA[i][j] = this.matrixA[k][j];
                        this.matrixA[k][j] = temp;
                    }
                }
            }
        }
    };
    Seidel.prototype.calculate = function () {
        var count = 0;
        var flag = 0;
        var y;
        do {
            var temp = [];
            temp.push(count + 1 + ') ');
            for (var i = 0; i < this.matrixA.length; i++) {
                y = this.B[i];
                this.B[i] = this.matrixA[i][this.matrixA.length];
                for (var j = 0; j < this.matrixA.length; j++) {
                    if (j != i)
                        this.B[i] = this.B[i] - this.matrixA[i][j] * this.B[j];
                }
                this.B[i] = this.B[i] / this.matrixA[i][i];
                if (Math.abs(this.B[i] - y) <= this.eps)
                    flag++;
                temp.push(this.B[i]);
            }
            console.log(temp);
            count++;
        } while (flag < this.matrixA.length);
    };
    Seidel.prototype.resolve = function () {
        console.log('Project Nr.2 by Tabanschi Alexandru');
        console.log('Application of the Seidel method');
        this.init();
        this.pivot();
        this.calculate();
        console.log('\n The solution is as follows:\n');
        for (var i = 0; i < this.matrixA.length; i++)
            console.log('x' + i + ' = ' + this.B[i]);
    };
    return Seidel;
}());
var seidel = new Seidel(0.0001);
