document.querySelectorAll('.input-box input').forEach((input)=>{
    let tempValue
    input.addEventListener('focus',()=>{
        tempValue = input.value
        input.value = ''
    })

    input.addEventListener('blur',()=>{
        if(input.value==''){
            input.value = tempValue
        }           
    })

    input.addEventListener('input',()=>{
        if(isNaN(Number(input.value))){
            input.value = ''
        }           
    })
})

document.querySelector('#crack').addEventListener('click',()=>{
    let correct_code = ''
    for(let i=0; i<=999; i++){
        let code = String(i)

        while(code.length%3 != 0){
            code = '0' + code
        }

        if(test(code,'1',1,true) && test(code,'2',1,false) && test(code,'3',2,false) && test(code,'4',0,false) && test(code,'5',1,false)){
            correct_code = code
        }
    }    

    for(let i=0; i<=2; i++){
        document.querySelectorAll('#output-box span')[i].innerHTML = correct_code ? correct_code[i] : '?'
    }
})

function test(code, c_no, c_total_pairs, c_placement){
    let condition = false

    let inputs_box_digits = ''
    document.querySelectorAll(`#input-box-${c_no} input`).forEach((input)=>{
        inputs_box_digits = inputs_box_digits + input.value
    })

    let total_pairs = 0
    let well_placements = 0

    let input_box_index = []
    let code_index = []

    for(let i=0; i<=2; i++){
        for(let j=0; j<=2; j++){
            if(inputs_box_digits[i]==code[j] && !input_box_index.includes(i) && !code_index.includes(j)){
                total_pairs++
                input_box_index.push(i)
                code_index.push(j)
                if(i==j){
                    well_placements++
                }
            }
        }
    }

    if(c_total_pairs==total_pairs){
        if((c_placement && well_placements==total_pairs) || (!c_placement && well_placements==0)){
            condition = true
        }
    }
    return condition
}