class JordanOptimised {
    A: number[][] = [];
    a: number[][] = [];
    x: number[] = [];
    n: number = 5;
    aux: number = 0;
    det: number = 1;

    constructor() {
        /*"71, 2, 3, -4, 4, 241; 4, 72, -5, 5, 2, 396; -3, 2, 73, 1, -3, 130; 3, 2, 1, 74, 1, 324; 4, -4, 3, 2, 75, 531"*/
        document.getElementById("sendBtn").addEventListener('click', () => {
            // @ts-ignore
            const textField = document.getElementById("textField").value;
            const array = textField.trim().split(";");
            this.A = [];

            for (const elem of array) {
                this.A.push(elem.trim().replaceAll(" ", "").split(",").map(x => +x));
            }

            this.initArray();
            this.output();
        });
    }

    public initArray(): void {
        for (let i = 0; i < this.A.length; i++) {
            this.a.push([]);
        }
    }

    public output(): void {
        console.log('Project Nr.2 by Tabanschi Alexandru');
        console.log('Application of the Gauss Jordan (optimized) method');

        this.initial();
        this.step1();
        this.step2();
    }

    public initial(): void {
        console.log('\nInitial system:');

        for(let i = 0; i < this.n; i++) {
            const temp: number[] = [];

            for(let j = 0; j < this.n; j++) {
                this.a[i][j] = this.A[i][j];
                temp.push(Number(this.a[i][j].toFixed(2)));
            }

            this.a[i][this.n] = this.A[i][this.n];
            temp.push(this.a[i][this.n]);
            console.log(temp);
        }
    }

    public step1(): void {
        let m: number;

        for(let l = 0; l < this.n; l++) {
            if (this.a[l][l] == 0){
                m = l + 1;

                while((this.a[m][l] == 0) && (m < this.n)) m++;

                if (m >= this.n){
                    console.log('Det = 0. The system doesnt have one solution')
                    return;
                }

                for (let j = 0; j <= this.n; j++){
                    this.aux = this.a[m][j]; this.a[m][j] = this.a[l][j]; this.a[l][j] = this.aux;
                    this.det = -this.det;
                }
            }

            this.det = this.det * this.a[l][l];

            for(let j = l+1; j <= this.n; j++)
                this.a[l][j] /= this.a[l][l];

            this.a[l][l] = 1;

            for(let i = 0; i < this.n; i++) {
                if (i !== l) {
                    for(let j = l+1; j <= this.n; j++)
                        this.a[i][j] = this.a[i][j] - this.a[i][l] * this.a[l][j];
                }
            }

            for(let i = 0; i < l; i++)
                this.a[i][l] = 0;

            for(let i = l+1; i < this.n; i++)
                this.a[i][l] = 0;
            console.log('\n The system in step ' + (l+1));

            for(let i = 0; i < this.n; i++) {
                const temp: number[] = [];

                for(let j = 0; j < this.n; j++)
                    temp.push(Number((this.a[i][j]).toFixed(2)));
                temp.push(Math.floor(this.a[i][this.n]));
                console.log(temp);
            }

        }

        for (let j = 0; j < this.n; j++)
            this.det = this.det * this.a[j][j];

        console.log('\n The determinant of the matrix is ' + this.det);
    }

    public step2(): void {
        const tempAux: number[] = [];
        const tempResolve: number[] = [];

        for(let i = 0; i < this.n; i++) {
            this.x[i] = this.a[i][this.n];
        }

        console.log('\n System resolve:');

        for(let i = 0; i < this.n; i++)
            tempResolve.push(Number(this.x[i].toFixed(2)));

        console.log(tempResolve);

        console.log('\n Verification:')

        for(let i = 0; i < this.n; i++) {
            this.aux = -this.A[i][this.n];

            for(let j = 0; j < this.n; j++)
                this.aux = this.aux + this.A[i][j] * this.x[j];

            tempAux.push(this.aux);
        }

        console.log(tempAux);
    }
}

const main = new JordanOptimised();
