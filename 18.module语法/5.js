export class Box {
    constructor(select, data) {
        this.ele=document.querySelector(select)
        this.title=data.title
        this.list=data.list
        this.render()
    }
    render(){
        let h1=this.ele.querySelector('h1')
        let ul=this.ele.querySelector('ul')
        h1.innerHTML=this.title
        ul.innerHTML=this.list.map(item=>`<li>${item}</li>`).join('')

    }
}


export class Box1 extends Box {
    constructor(select, data) {
        super(select, data)
        this.url=data.url
        //父类的会先走一遍render
        this.render()
    }
    render(){
        console.log('url',this.url);//父类render
        
        super.render()
        let img=this.ele.querySelector('img')
        img.src=this.url
    }
}

// export {
//     Box,Box1
// }