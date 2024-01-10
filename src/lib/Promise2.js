export class Promise2 {
    constructor(executor) {
        this.onrejected = (reason) => { throw reason; };
        this.onresolved = (reason) => { throw reason; };
        this.onfinally = () => {};

        new Promise(executor).then((response) => {
            this.onresolved(response);
        }, (reason) => {
            this.onrejected(reason);
        }).finally(() => {
            this.onfinally();
        });
    }

    then(onresolved, onrejected = undefined) {
        this.onresolved = onresolved;
        if (onrejected) {
            this.catch(onrejected);
        }

        return this;
    }

    catch(onrejected) {
        this.onrejected = onrejected;
        return this;
    }

    finally(onfinally) {
        this.onfinally = onfinally;
        return this;
    }
}