var Main = /** @class */ (function () {
    function Main() {
        this.A = [[71, 2, 3, -4, 4, 241], [4, 72, -5, 5, 2, 396], [-3, 2, 73, 1, -3, 130], [3, 2, 1, 74, 1, 324], [4, -4, 3, 2, 75, 531]];
        this.a = [];
        this.x = [];
        this.n = 5;
        this.det = 1;
        this.initArrays();
        this.output();
    }
    Main.prototype.initArrays = function () {
        for (var i = 0; i < this.A.length; i++) {
            this.a.push([]);
        }
    };
    Main.prototype.output = function () {
        console.log('Project Nr.2 by Tabanschi Alexandru');
        console.log('Application of the Gauss Jordan (optimized) method');
        this.initial();
        this.step1();
        this.step2();
    };
    Main.prototype.initial = function () {
        console.log('\nInitial system:');
        for (var i = 0; i < this.n; i++) {
            var temp = [];
            for (var j = 0; j < this.n; j++) {
                this.a[i][j] = this.A[i][j];
                temp.push(this.a[i][j]);
            }
            this.a[i][this.n] = this.A[i][this.n];
            temp.push(this.a[i][this.n]);
            console.log(temp);
        }
    };
    Main.prototype.step1 = function () {
        var m;
        for (var l = 0; l < this.n; l++) {
            if (this.a[l][l] == 0) {
                m = l + 1;
                while ((this.a[m][l] == 0) && (m < this.n))
                    m++;
                if (m >= this.n) {
                    console.log('Det = 0. The system doesnt have one solution');
                    return;
                }
                for (var j = 0; j <= this.n; j++) {
                    this.aux = this.a[m][j];
                    this.a[m][j] = this.a[l][j];
                    this.a[l][j] = this.aux;
                    this.det = -this.det;
                }
            }
            this.det = this.det * this.a[l][l];
            for (var j = l + 1; j <= this.n; j++)
                this.a[l][j] /= this.a[l][l];
            this.a[l][l] = 1;
            for (var i = l + 1; i < this.n; i++) {
                for (var j = l + 1; j <= this.n; j++)
                    this.a[i][j] = this.a[i][j] - this.a[i][l] * this.a[l][j];
            }
            for (var i = l + 1; i < this.n; i++)
                this.a[i][l] = 0;
            console.log('The system in step ' + (l + 1));
            for (var i = 0; i < this.n; i++) {
                for (var j = 0; j < this.n; j++)
                    console.log(this.a[i][j]);
                console.log(this.a[i][this.n]);
            }
        }
        for (var j = 0; j < this.n; j++)
            this.det = this.det * this.a[j][j];
        console.log('The determinant of the matrix is ' + this.det);
    };
    Main.prototype.step2 = function () {
        this.x[this.n - 1] = this.a[this.n - 1][this.n];
        for (var i = this.n - 2; i >= 0; i--) {
            this.aux = 0;
            for (var j = i + 1; j < this.n; j++)
                this.aux = this.aux + this.a[i][j] * this.x[j];
            this.x[i] = this.a[i][this.n] - this.aux;
        }
        console.log('System resolve:');
        for (var i = 0; i < this.n; i++)
            console.log(this.x[i]);
        console.log('Verification');
        for (var i = 0; i < this.n; i++) {
            this.aux = -this.A[i][this.n];
            for (var j = 0; j < this.n; j++)
                this.aux = this.aux + this.A[i][j] * this.x[j];
            console.log(this.aux);
        }
    };
    return Main;
}());
var main = new Main();
