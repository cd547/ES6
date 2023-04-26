function ajax(){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(111)
        },2000)
    })
}
let data=await ajax()
export default{
    name:'moduleA',
    data //以前导出时会是undefined，现在会等到有数据
}