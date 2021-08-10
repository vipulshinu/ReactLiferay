import React from 'react';
import './css/Dashboard.css';
import DateRangePicker from 'react-daterange-picker';
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(originalMoment);

export default class Dashboard extends React.Component{
    constructor(props){
        super(props);

        const today = moment();
        this.state = {
            isOpen: false,
            value: moment.range(today.clone().subtract(7, "days"), today.clone()),
            dates: "--/--/---- - --/--/----"

        }
    }

    onFinalValue = (value) => {
        this.setState({
          dates:
            `${this.state.value.start.format("YYYY-MM-DD")} - ${this.state.value.end.format("YYYY-MM-DD")}`
        });
      };
    
      onSelect = (value, states) => {
        this.setState({ value, states });
        this.onFinalValue(value);
      };
    
      onToggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
      };
      

    render(){
        return(
            <div className="dashboard">
                <div className="topbar">
                    <div className="titlediv"><p className="title"><b>Renewals By Categories</b></p></div>
                    <div className="calendar">
                        <input
                            type="button"
                            value= {this.state.dates}
                            onClick={this.onToggle}
                        />
                    </div>

                    {this.state.isOpen && (
                    <DateRangePicker
                        value={this.state.value}
                        onSelect={this.onSelect}
                        singleDateRange={true}
                    />
                    )}
                </div>
            </div>
        );
    }
}