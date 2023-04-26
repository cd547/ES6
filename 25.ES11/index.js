//const json_BigInt=require('json-bigint')
import JSONBigInt from 'json-bigint'


let jsonstr = `
{
    "id":99999888887741551111,
    "list":[]
}`
console.log(JSONBigInt.parse(jsonstr));
/**
 * {
  id: BigNumber { s: 1, e: 19, c: [ 999998, 88887741551111 ] },
  list: []
}
 */
//方案1.转换成字符串
let JSONBigIntStr=JSONBigInt({storeAsString:true})
console.log(JSONBigIntStr.parse(jsonstr));//{ id: '99999888887741551111', list: [] }
//方案2.ES11转换成BigInt
let JSONBigIntNative=JSONBigInt({useNativeBigInt:true})
console.log(JSONBigIntNative.parse(jsonstr));//{ id: 99999888887741551111n, list: [] }

console.log('this',this);//this undefined
try{
  console.log('window',window);
}catch(e){
  console.log('window',e);//window ReferenceError: window is not defined
}

console.log('global',global);//global <ref *1> Object [global]{.....}
console.log('globalThis',globalThis===global);//globalThis true
