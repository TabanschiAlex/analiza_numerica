class Seidel {
    eps: number;

    matrixA: number[][] = [
        [72, 2, 4, 2, 5, 1],
        [3, 73, 1, 3, 1, 2],
        [4, 1, 74, 1, 2, 3],
        [1, 3, 2, 75, 3, 4],
        [2, 1, 1, 3, 74, 5]
    ];
    B: number[] = [0, 0, 0, 0, 0];

    constructor(eps: number) {
        this.eps = eps;
        this.resolve();
    }

    init(): void {
        for (let i = 0; i < this.matrixA.length; i++) {
            const temp: number[] = [];

            for (let j = 0; j < this.matrixA.length; j++) {
                temp.push(this.matrixA[i][j])
            }

            console.log(temp);
        }
    }

    pivot(): void {
        for (let i = 0; i < this.matrixA.length; i++) {
            for (let k = i + 1; k < this.matrixA.length; k++) {
                if (Math.abs(this.matrixA[i][i]) < Math.abs(this.matrixA[k][i])) {
                    for (let j = 0;j <= this.matrixA.length; j++) {
                        const temp: number = this.matrixA[i][j];
                        this.matrixA[i][j] = this.matrixA[k][j];
                        this.matrixA[k][j] = temp;
                    }
                }
            }
        }
    }

    calculate(): void {
        let count: number = 0;
        let flag: number = 0;
        let y: number;

        do {
            const temp: any[] = [];
            temp.push(count + 1 + ') ');

            for (let i = 0;i < this.matrixA.length; i++) {
                y = this.B[i];
                this.B[i] = this.matrixA[i][this.matrixA.length];

                for (let j = 0;j < this.matrixA.length; j++) {
                    if (j != i)
                        this.B[i] = this.B[i] - this.matrixA[i][j] * this.B[j];
                }

                this.B[i] = this.B[i] / this.matrixA[i][i];

                if (Math.abs(this.B[i]-y) <= this.eps) flag++;

                temp.push(this.B[i]);
            }

            console.log(temp)

            count++;
        } while(flag < this.matrixA.length);
    }

    resolve(): void {
        console.log('Project Nr.2 by Tabanschi Alexandru');
        console.log('Application of the Seidel method');

        this.init();
        this.pivot();
        this.calculate();

        console.log('\n The solution is as follows:\n');

        for (let i = 0;i < this.matrixA.length; i++)
            console.log('x' + i + ' = ' + this.B[i]);
    }

}

const seidel = new Seidel(0.0001);
