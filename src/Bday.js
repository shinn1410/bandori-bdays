import React, { Component } from 'react';
import './Bday.css';

// const API_ROOT = "https://bandori.party/api/members/";
const API_ROOT = "https://bandori.party/api/members/";

export default class Bday extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members:[],
      birthdays:{},
      doneLoading: false
    };
  }
  getMembers(url, members) {
    let next = null;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(data && data.results) {
          next = data.next;
          for(let m of data.results) {
            members.push(m);
          }
        }
        if(next == null) {
          let bdays = this.state.birthdays;
          members.map(member => {
            let bdate = member.birthday.slice(-5);
            bdays[bdate] = {name:member.name, icon:member.square_image};
            return bdate;
          });
          this.setState({"members":members,"birthdays":bdays,"doneLoading":true});
          return members;
        } else {
          return this.getMembers(next, members);
        }
      });
  }
  componentDidMount(props) {
    const today = new Date();
    let mm = ("0"+(today.getMonth()+1)).slice(-2);
    let dd = ("0"+today.getDate()).slice(-2);
    let todayString = mm+"-"+dd;
    this.setState({"today":todayString});
    this.getMembers(API_ROOT,[]);
  }

  dateCell(dateString) {
    // return dateString;
    let isTodayFormat = "cell";
    if(dateString===this.state.today) {
      isTodayFormat += " today";
    }
    if(this.state.birthdays[dateString]) {
      console.log("birthday found!");
      return (
        <td className={isTodayFormat} id={dateString} key={dateString}>
          <img className="icon" src={this.state.birthdays[dateString].icon} alt={this.state.birthdays[dateString].name} title={this.state.birthdays[dateString].name}/>
        </td>
      );
    }
    else {
      return <td className={isTodayFormat} id={dateString} key={dateString}>{dateString.slice(-2)}</td>;
    }
  }

  render() {
    const months = [
      {name:"Jan",days:31},
      {name:"Feb",days:29},
      {name:"Mar",days:31},
      {name:"Apr",days:30},
      {name:"May",days:31},
      {name:"Jun",days:30},
      {name:"Jul",days:31},
      {name:"Aug",days:31},
      {name:"Sep",days:30},
      {name:"Oct",days:31},
      {name:"Nov",days:30},
      {name:"Dec",days:31},
    ];
    console.log("Entered Bday.render()");
    if(this.state.doneLoading) {
      let calendar = months.map((month,index)=>{
        let monthString = ("0"+(index+1)).slice(-2)+"-";
        let arr = Array.apply(null,{length:month.days}).map(Number.call, Number);
        return (<tr key={month.name}>
            <td>{month.name}</td>
            {arr.map((i)=>{
              let dayString = ("0"+(i+1)).slice(-2);
              return this.dateCell(monthString+dayString)
            })}
          </tr>);
      });
      return (
        <table className="bday">
          <tbody>
            { calendar }
          </tbody>
        </table>
      );
    }
    else {
      return (<p>Loading...</p>);
    }
  }
}
