function myPromise(executor) {
    this.status = 'pending'
    this.result = undefined
    this.cb = []
    let _this = this

    function resolve(res) {
        if (_this.status !== 'pending') {//状态不可变
            return
        }
        console.log('resolve', _this);
        _this.status = 'fulfilled'
        _this.result = res
        _this.cb.forEach(item => {
            item.resolvecb && item.resolvecb(_this.result)
        })
    }
    function reject(err) {
        if (_this.status !== 'pending') {//状态不可变
            return
        }
        console.log('reject', _this);
        _this.status = 'rejected'
        _this.result = err
        // _this.cb.rejectcb && _this.cb.rejectcb(_this.result)
        _this.cb.forEach((item, index) => {
            console.log(index, item);

            item.rejectcb && item.rejectcb(_this.result)
        })
    }
    executor(resolve, reject)
}
myPromise.prototype.then = function (resolvecb, rejectcb) {

    //当resolvecb、resolvecb是未定义的时候，构造一个空函数，只负责传参
    if(!resolvecb){
        resolvecb=value=>value
    }
    if(!rejectcb){
        rejectcb=error=>error
    }
    return new myPromise((resolve, reject) => {
        if (this.status === 'fulfilled') {
            console.log('同步', resolvecb);
            let result = resolvecb && resolvecb(this.result)//如果没有resolvecb
            console.log('result', result);
            //是否是自定义的myPromise
            if (result instanceof myPromise) {
                result.then(res => {
                    console.log('res1', res);
                    resolve(res)
                }, err => {
                    console.log('err1', err);
                    reject(err)
                })
            } else {
                resolve(result)
            }

        }
        if (this.status === 'rejected') {
            console.log('同步', rejectcb);
            let result = rejectcb && rejectcb(this.result)//如果没有rejectcb
            //是否是自定义的myPromise
            if (result instanceof myPromise) {
                result.then(res => {
                    console.log('res1', res);
                    resolve(res)
                }, err => {
                    console.log('err1', err);
                    reject(err)
                })
            } else {
                //普通字符串就是then里面的第一个方法（fulfilled）
                reject(result)
            }
        }
        if (this.status === 'pending') {
            console.log('异步', resolvecb, rejectcb);
            //异步处理，收集回调
            this.cb.push({
                resolvecb: () => {
                    let result = resolvecb && resolvecb(this.result)//看返回值
                    if (result instanceof myPromise) {
                        result.then(res => {
                            console.log('异步res1', res);
                            resolve(res)
                        }, err => {
                            console.log('异步err1', err);
                            reject(err)
                        })
                    } else {
                        //普通字符串就是then里面的第一个方法（fulfilled）
                        resolve(result)
                    }
                },
                rejectcb: () => {
                    let result = rejectcb && rejectcb(this.result)//看返回值
                    if (result instanceof myPromise) {
                        result.then(res => {
                            console.log('异步res1', res);
                            resolve(res)
                        }, err => {
                            console.log('异步err1', err);
                            reject(err)
                        })
                    } else {
                        //普通字符串就是then里面的第一个方法（fulfilled）
                        reject(result)
                    }
                }
            })
        }
    })
}

myPromise.prototype.catch = function (rejectcb) {
    this.then(undefined, rejectcb)
}