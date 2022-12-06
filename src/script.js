

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      formula: "0",
      ans:"0"
    }
    this.operate = this.operate.bind(this);
  }
  operate(inp){
    const operations = ["+", "-", "*", "/"];
    
    if(this.state.formula.includes("=")){
      this.setState({
        formula: "0",
        ans:"0"
      });
    }
    
    switch(inp){
      case "AC": this.setState({
                    formula: "0",
                    ans:"0"
                 });break;
        
      case 0: this.setState((prevState)=>{
                if(operations.includes(prevState.ans)){
                  return {
                    formula: prevState.formula + "0",
                    ans: "0"
                  };
                }else if(prevState.formula != "0"){
                  return {
                    formula: prevState.formula + "0",
                    ans: prevState.ans + "0"
                  };
                }
              });break;
        
      case "/":
      case "*":
      case "+": this.setState((prevState) => {
                  if(operations.includes(prevState["formula"].charAt(this.state["formula"].length-1))){
                    return prevState;
                  }else {
                    return {
                      formula: prevState.formula + inp,
                       ans: inp
                    };
                  }
                });break;
        
      case "-": this.setState((prevState)=> {
                  if(operations.includes(prevState["formula"].charAt(this.state["formula"].length-2))){
                    return prevState;
                  }else {
                    return {
                      formula: prevState.formula + inp,
                      ans: inp
                    };
                  }
                });break;
        
      case ".": this.setState((prevState)=>{
                  if(prevState.ans.includes(".")) return prevState;
                  else {
                    return {
                      formula: prevState.formula + '.',
                      ans: prevState.ans + '.'
                    };
                  }
                });break;
        
      case "=": this.setState((prevState)=>{
                  const result = math.evaluate(prevState.formula);
                  console.log(result);
                  return {
                    formula: prevState.formula + "=" + result,
                    ans:  result +''
                  };
                });break;
        
      default: this.setState((prevState) => {
                if(operations.includes(prevState.ans.charAt(prevState.ans.length-1))){
                  return {
                    formula: prevState.formula + inp,
                    ans: inp + ''
                  };
                }
                if(prevState.formula=="0"){
                  return {
                    formula: inp+'',
                    ans: inp +''
                  }
                }
                return {
                  formula: prevState.formula + inp,
                  ans: prevState.ans + inp
                };
              });
    }
  }
  render() {
    let formula = this.state.formula;
    let ans = this.state.ans;
    if(formula.length > 29) {
      formula = formula.slice(formula.length-26);
    }
    if(ans.length > 26) {
      ans = ans.slice(ans.length-26);
    }
    return (
      <div className="calculator">
        <div className="formula">{formula}</div>
        <div className="ans" id="display">{ans}</div>
        <div className="row">
          <button className="AC" id="clear" onClick={()=>this.operate("AC")}>AC</button>
          <button className="operator" id="divide" onClick={()=>this.operate("/")}>/</button>
          <button className="operator" id="multiply" onClick={()=>this.operate("*")}>x</button>
        </div>
        <div  className="row">
          <button className="number" id="seven" onClick={()=>this.operate(7)}>7</button>
          <button className="number" id="eight" onClick={()=>this.operate(8)}>8</button>
          <button className="number" id="nine" onClick={()=>this.operate(9)}>9</button>
          <button className="operator" id="subtract" onClick={()=>this.operate("-")}>-</button>
        </div>
        <div  className="row">
          <button className="number" id="four" onClick={()=>this.operate(4)}>4</button>
          <button className="number" id="five" onClick={()=>this.operate(5)}>5</button>
          <button className="number" id="six" onClick={()=>this.operate(6)}>6</button>
          <button className="operator" id="add" onClick={()=>this.operate("+")}>+</button>
        </div>
        <div  className="row">
          <button className="number" id="one" onClick={()=>this.operate(1)}>1</button>
          <button className="number" id="two" onClick={()=>this.operate(2)}>2</button>
          <button className="number" id="three" onClick={()=>this.operate(3)}>3</button>
          <button className="operator equalto" id="equals" onClick={()=>this.operate("=")}>=</button>
        </div>
        <div  className="row">
          <button className="number zero" id="zero" onClick={()=>this.operate(0)}>0</button>
          <button className="number" id="decimal" onClick={()=>this.operate(".")}>.</button>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
      <App/>,
      document.getElementById("root")
); 