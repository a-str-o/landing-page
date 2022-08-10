import { Component } from "react";
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import React from 'react';
import './Home.css';
import emailjs from 'emailjs-com';


const Quiz_Set = [
    {
        queno:"que_1",
        que : "1) Quel âge avez-vous ?",
        options : [
            {que_options: "- 18 ans" , selected: false},
            {que_options:"19-30 ans ", selected: false},
            {que_options:"30- 45 ans ",selected: false},
            {que_options:"+45 ans", selected: false}],
        ans : "0"
    },
    {
        queno:"que_2",
        que : "2) Combien dépensez vous d'argent par an pour des vêtements ?",
        options : [
            { que_options: "0 - 5000 Dh (soit moins de 500 dh par mois) " ,selected: false},
            {que_options:"5000-12 000 Dh (soit entre 500 et 1000 dh par mois)", selected: false},
            {que_options:"12 000 - 20 000 DH  (soit entre 1 000 et 1 700 dh par mois)", selected: false},
            {que_options:"Plus que 20 000 Dh (soit plus de 1 700 dh par mois ) ", selected: false}],
        ans : "Right Angled"
    },
    {
        queno:"que_3",
        que : "3) L'idée de louer un vêtement…",
        options : [
            {que_options: "Déjà essayé, validé et approuvé ! " , selected: false},
            {que_options:"Jamais encore essayé, mais pas contre l'idée… ", selected: false},
            {que_options:"Je le ferai uniquement pour des occasions spéciales (robe de soirée, caftans)", selected: false}],
        ans : "8"
    },
    {
        queno:"que_4",
        que : "4) Qu'est ce que tu es le plus intéressée à louer? ",
        options : [
            {que_options: "All day : Pièces sympas de tous les jours" , selected: false},
            {que_options:"Sorties : Pièces habillées", selected: false},
            {que_options:"Evenements : robe de soirées, galas, cocktail", selected: false},
            {que_options:"Maternité", selected: false}],
        ans : "180"
    },
    {
        queno:"que_5",
        que : "5) Quelles sont vos mensurations?",
        options : [
            {que_options: "IsosceXS-S / 34-36les" , selected: false},
            {que_options:"M / 38-40", selected: false},
            {que_options:"L / 42-44", selected: false},
            {que_options:"XL - XXL / +46", selected: false}],
        ans : "Equilateral"
    },
    {
        queno:"que_6",
        que : "6) Seriez-vous prête à mettre en location des pépites qui t'appartienne pour en faire profiter d'autres modeuses ?",
        options : [
            {que_options: "Non, je garde uniquement pour moi mes pépites ! " , selected: false},
            {que_options:"Oui, si je suis sure de ne pas vouloir les reporter ! ", selected: false},
            {que_options:"Oui bien sûr !", selected: false}],
        ans : "31"
    },
]

class Quiz extends Component{

   constructor(props){
        super(props)
        this.state = {
            activeStep:0,
            Quiz_Set : Quiz_Set,
            booleanonsubmit : false,
            Total:0,
            open:false,
            catchmsg:"",
            errormsg:"",
            one:"",
            two:"",
            three:"",
            four:"",
            five:"",
            six:"",
            email:this.props.email
        }
        
   }

    handleNext=()=>{
        this.setState({activeStep:this.state.activeStep+1})
    }

    handleBack=()=>{
        this.setState({activeStep:this.state.activeStep-1})
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
         this.setState({open : false})
      };

    onInputChange = (e) => {

          const { Quiz_Set } = this.state;
           


            const nexState = Quiz_Set.map(card => {
                


            if (card.queno !== e.target.name) return card;
            return {
                ...card,
                options: card.options.map(opt => { 
                    
                if ("que_1" === e.target.name)
                {
                    this.setState({one: e.target.value})
                    
                } 
                if ("que_2" === e.target.name)
                {
                    this.setState({two:e.target.value})
                    
                } 
                if ("que_3" === e.target.name)
                {
                    this.setState({three:e.target.value})
                    
                } 
                if ("que_4" === e.target.name)
                {
                    this.setState({four:e.target.value})
                    
                } 
                if ("que_5" === e.target.name)
                {
                    this.setState({five:e.target.value})
                    
                } 
                if ("que_6" === e.target.name)
                {
                    this.setState({six:e.target.value})
                    
                } 
                const checked = opt.que_options === e.target.value;
                return {
                    ...opt,
                    selected: checked
                }
                })
            }
            });
            this.setState({ Quiz_Set: nexState })
    }

    onsubmit = () =>{
        emailjs.send(
			'service_lqtj6a5',
			'template_dyr3fn8',
			{
				email: this.state.email,
                one:this.state.one,
                two:this.state.two,
                three:this.state.three,
                four:this.state.four,
                five:this.state.five,
                six:this.state.six,
			  },
			'fdIKcAw0wrB1qriMv'
		  )
			.then((response) => {
			  console.log('SUCCESS!', response.status, response.text);
			})
			.catch((err) => {
			  console.log('FAILED...', err);
			});
            window.location.reload(false);
    }


 
render(){
return(
 <div className="Quiz_render_container">

     <div className="Quiz_container_display"> 
          {this.state.Quiz_Set.map((item,index)=>{
             if( Math.abs(this.state.activeStep - index)<=0)
             {
                return (
                    <div className="all">
                      <div className="Quiz_que" key={index}>{item.que}</div>

                            {item.options.map((ans,index_ans)=>{
                                return (
                                    <div key={index_ans} className="Quiz_multiple_options">
                                         
                                         { (index_ans===0) ? 'a' : (index_ans===1) ? 'b' : (index_ans===2) ? 'c' : 'd'} => {ans.que_options}
                                    
                                         <input
                                            key={index_ans}
                                            type="radio"
                                            name={item.queno}
                                            value={ans.que_options}
                                            checked={!!ans.selected}
                                            onChange={this.onInputChange}
                                        />
                                    </div>
                                    )
                            })}
                     
                   
                    </div>
                )
             }else{
                 return null
             }
              
          })}

       <div className="Quiz-MobileStepper">
        <MobileStepper  variant="dots" steps={this.state.Quiz_Set.length} position="static" activeStep={this.state.activeStep}
            nextButton={
                this.state.activeStep === 5 ? 
                <Button size="small" onClick={this.onsubmit}>
                 Submit
                </Button>
                :
                <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === this.state.Quiz_Set.length}>
                Next
                </Button>

            }
            backButton={
                <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                    Back
                </Button>
            }
        />
        </div>
     </div>
  </div>
   )
  }
}

export default Quiz;