class Simpson {
    private readonly eps: number;
    private k;

    constructor(eps: number) {
        this.eps = eps;
        this.resolve();
    }

    private f(x: number, occasion: string = 'a'): number {
        switch (occasion) {
            case 'a': return x * x * x + 3 * x * x + 3 * x + 6;
            case 'b': return 3 * x * x * x * x + x * x * x + 3 * x * x + 3 * x + 6;
            case 'c':  return x * x * x * x * x + 3 * x * x * x * x + x * x * x + 3 * x * x + 3 * x + 6;
            case 'd': return Math.cos(2 * x * x + 1) * Math.sin(2 * x);
        }
    }

    private df(x: number, occasion: string = 'a') {
        switch (occasion) {
            case 'a': return 6*x + 6;
            case 'b': return 36 * x * x + 6*x + 6;
            case 'c': return 20 * x * x * x + 36 * x * x + 6 * x + 6;
        }
    }

    private simpson(a: number, b: number, occasion: string = 'a'): number {
        return (b - a) / 6 * (this.f(a, occasion) + 4 * this.f((a + b)/ 2, occasion) + this.f(b, occasion));
    }

    private range(a: number, b: number, occasion: string = 'a'): number {
        let i: number, x: number, S0: number, S: number, h: number;
        this.k = 1;

        h = b - a;
        S = this.simpson(a, b, occasion);
        do {
            S0 = S;
            S = 0; x = a;
            this.k *= 2;
            h /= 2;

            for (i = 1; i <= this.k; i++) {
                S = S + this.simpson(x, x + h, occasion);
                x += h;
            }
        } while (Math.abs(S - S0) > this.eps);

        return S;
    }

    private resolve(): void {
        const a: number = 1, b: number = 5;
        let S: number, R: number, I: number, x: number, h: number, i: number;
        let n: number = 100;

        console.log("Project Nr.4 by Tabanschi Alexandru");
        console.log("Approximate calculation of defined integrals\n");
        S = this.simpson(a, b);
        console.log("a) Valoarea aproximativa a integralei, identica cu cea exacta: " + S);

        h = (b - a)/n;
        x = a; S = 0;

        for ( i = 1; i <= n; i++) {
            S = S + this.simpson(x, x + h);
            x += h;
        }

        console.log("Formula generalizata: Valoarea aproximativa a integralei: " + S);

        S = this.simpson(a, b, 'b');
        R = Math.pow((b - a) / 2, 5) * this.df(a, 'b')/90;
        I = S + R;

        console.log("\nb) Valoarea aproximativa a integralei: " + S);
        console.log("Valoarea termenului de rest: " + R);
        console.log("Valoarea exacta a integralei: " + I);

        x = a; S = 0;
        for ( i = 1; i <= n; i++) {
            S = S + this.simpson(x, x + h, 'b');
            x += h;
        }
        R = Math.pow((b - a) / 2, 5) * this.df(a, 'b')/(90*n*n*n*n);
        I = S + R;

        console.log("Formula generalizata: Valoarea aproximativa a integralei: " + S);
        console.log("Valoarea termenului de rest: " + R);
        console.log("Valoarea exacta a integralei: " + I);
        S = this.range(a, b, 'b');
        console.log("Regula Runge: Valoarea aproximativa a integralei dupa " + this.k + " diviziuni: " + S.toFixed(16));

        S = this.simpson(a, b, 'c');
        R = Math.pow((b - a) / 2, 5) * this.df(b, 'c')/90;
        I = S + R;

        console.log("\nc) Valoarea aproximativa a integralei: " + S);
        console.log("Valoarea maximala a termenului de rest: " + R);
        console.log("Valoarea exacta a integralei este intre " + S + " si " + I);

        x = a; S = 0;

        for ( i = 1; i <= n; i++) {
            S = S + this.simpson(x, x + h, 'c');
            x += h;
        }

        R = Math.pow((b - a) / 2, 5) * this.df(b, 'c')/(90*n*n*n*n);
        I = S + R;

        console.log("Formula generalizata: Valoarea aproximativa a integralei: " + S);
        console.log("Valoarea termenului de rest: " + R);
        console.log("Valoarea exacta a integralei este intre " + S + " si " + I);
        S = this.range(a, b, 'c');
        console.log("Regula Runge: Valoarea aproximativa a integralei dupa " + this.k + " diviziuni: " + S.toFixed(16));

        S = this.range(a, b, 'd');
        console.log("\nd) Regula Runge: Valoarea aproximativa a integralei dupa " + this.k + " diviziuni: " + S.toFixed(16));
    }

}

new Simpson(1e-9);
