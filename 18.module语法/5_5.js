import {Box} from './5.js'


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
export default Box1
// export {
//     Box,Box1
// }