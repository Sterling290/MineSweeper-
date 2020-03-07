import React,{Component} from 'react';
import styled from 'styled-components'
import {ListGroup,Container,Row,Col} from 'react-bootstrap';
import mine from './mine.png'
const shuffle = require('shuffle-array');
class MineTable extends React.Component {
constructor(props){
super(props)
this.state = {
   mines : [] ,
   minesChecker:[]
}
}

componentDidMount(){
var array = []
//at most 20 bombs
for(var i = 0; i < 20; i++){
  array.push(9)  
}
// at most 80 safe spots
for(var i = 0; i < 80; i++){
    array.push(0)  
}
//shuffle
for(var i = 0; i < Math.floor(Math.random() * Math.floor(20));i++){
    shuffle(array)
}
this.setState({ mines: array})
}

render(){
var safeSquares = 0
var ar = []
var tempArray = []
console.log(this.state.mines)
// making comparison array -> ar
this.state.mines.map((each)=>{
    if (tempArray.length === 10){
        ar.push(tempArray)
        tempArray = [] 
    }
   return tempArray.push(each) 
})
console.log(ar)

//setting numbers 
var nums = ar.map((each,x)=>
each.map((every,i) => {
    var check = every
    if(every !== 9 && ar[x][i + 1] === 9){  
        check += 1 
    }
    if(every !== 9 && ar[x][i - 1] === 9){  
        check += 1 
    }
    if(ar[x + 1] && every !== 9 && ar[x+1][i] === 9 ){  
        check += 1 
    }
    if(ar[x - 1] && every !== 9 && ar[x-1][i] === 9 ){  
        check += 1 
    }
    if(ar[x + 1] && every !== 9 && (ar[x+1][i+1] === 9 ||ar[x+1][i-1] === 9 )){  
        check += 1 
    }
    if(ar[x - 1] && every !== 9 && ( ar[x-1][i + 1] === 9 || ar[x-1][i - 1] === 9)){  
        check += 1 
    }  
    return check
}))
//counting safe spots 
var safeCount = nums.flat().map((every) => {
    if(every !== 9){ safeSquares += 1}
 return})
console.log(nums)
console.log(nums.flat())

//styling  
const Styles = styled.div`
    .wrapper {
        
        display:grid;
        grid-template-columns: repeat(10, 60px);
        grid-template-rows: repeat(10, 60px);
        grid-column-gap: 0px;
        // border:2px 
        // border-color:#FF0000
        margin: auto;
        width: 50%;
        // border: 3px solid green;
        padding: 10px;
       

      }
      .gridbox{
        width: 60px;
         height: 60px;
        border: 1px solid blue;
        background-color:	#909090
    }
    .outside{
        margin: auto;
        width: auto;
        border: 3px solid blue;
        padding: 10px;

        
    }
    .green{
        width: 60px;
        height: 60px;
        border: 1px solid green;
        color:solid green;
        background-color:green;
    }
    .redBackground{
        width: 60px;
        height: 60px;
        border: 1px solid #ff9999;
        color:#ff9999;
        background-color:#ff9999;

    }
    .center{
        display: "block";
        height:30%; 
        padding:10px;
        margin: auto;
        //margin-right: "auto";
        //width=10%;

    }
    `
return(
 <Styles>
     <Container>
    <Row>
    <Col>
 {/* <div>{this.state.mines}</div> */}
 <div className="outside">
 <div class="wrapper">
 {nums.flat().map((each,i)=> 
 <div>
<div className = "green" id= {`green${i}`}   style={{display:"none"}}> {each}</div>
<div className = "redBackground" id= {`redBackground${i}`}   style={{display:"none"}}> 
  <img className = "center"
      src={mine}
      alt="Third slide"
    />
</div>
 <button className="gridbox" id={`Grid${i}`}
 onClick={(e)=> e.preventDefault(each !== 9? document.getElementById(`green${i}`).style.display = "block"  :document.getElementById(`redBackground${i}`).style.display = "block",document.getElementById(`Grid${i}`).style.display = "none"
 , each !== 9? safeSquares -1 === 0? document.getElementById(`tryingsomething`).textContent = "you win": document.getElementById(`bombNumber`).textContent = safeSquares -= 1:document.getElementById(`tryingsomething`).textContent = "you loose"
  , each !== 9? safeSquares -1 === 0?document.getElementById(`bombNumber`).style.display = "none":console.log("win") :document.getElementById(`bombNumber`).style.display = "none"
 )}
 ></button>
 </div>
 )}
</div>

 </div>
 </Col>
 <Col>
 <div><h1>Score</h1></div>
 <Row>
<Col><p>Safe Zones:</p><p id ="bombNumber">{safeSquares}</p></Col>
<Col><div id={"tryingsomething"}></div></Col>
 </Row>
 </Col>
 </Row>
 </Container>
 {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}

</Styles>



)}}
export default MineTable
