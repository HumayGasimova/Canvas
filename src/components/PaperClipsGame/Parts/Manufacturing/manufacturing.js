/**
* Libraries
*/

import React,{
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import {
    bindActionCreators
} from 'redux';

import { Subject } from 'rxjs';
import {  Observable } from 'rxjs';
import 'rxjs/add/observable/fromEvent';


/**
* Components
*/

import Button from '../../../../library/Button/button';

/**
* Styles
*/

import './manufacturing.scss';

/**
* Actions
*/

import * as Actions from '../../../../actions';

/**
* Manufacturing component definition and export
*/

// const clicks = new Observable(observer => {
//     const handler = (e) => observer.next(e);
//     button.addEventListener('click', handler);
//     return () => button.removeEventListener('click', handler);
// });
// const subject = new Subject();
// const button = document.querySelector('wireButton');

// button.addEventListener('click', () => subject.next('click'));
// subject.subscribe(x => console.log(x))

// const click$ = Observable.fromEvent(button, 'click');

export class Manufacturing extends Component {

    /**
    * Constructor
    */

    constructor (props){
        super(props);
        // this.buttonRef = React.createRef();
    }

    /**
    * Methods
    */

    componentDidMount() {
        // click$
        // .bufferWhen(() => click$.delay(400))
        // .subscribe((res) => {
        //     console.log(Math.random().toString(36).slice(2)) ;
        // });
    }
   

    /**
    * Methods
    */

    renderAutoClippers = () => {
        if(this.props.autoClipperInitPrice === 5){
            return(
                <div className="manufacturing-section">
                    <div className="manufacturing-wrapper2">
                        <Button
                            onClick={()=>this.props.autoPaperclips(this.props.paperclipPrice, this.props.delay, this.props.delayAutoPaperClippers, this.props.wire)}
                            text={"AutoClippers"}
                            disabled={this.props.autoClippersButtonDisabled}
                       
                        />
                        <div className="manufacturing-text">{this.props.autoClippersPerSec}</div>
                    </div>
                    <div className="manufacturing-text">Cost: ${this.props.autoClippersPerSec === 0 ? this.props.autoClipperInitPrice : this.props.autoClipperPrice}</div>
                </div>  
            )
        }
    }

    renderMegaClippers = () => {
        if(this.props.megaClippersIsShown){
            return(
                <div className="manufacturing-section">
                    <div className="manufacturing-wrapper2">
                        <Button
                            // onClick={()=>this.props.autoPaperclips()}
                            text={"MegaClippers"}
                            disabled={this.props.autoClippersButtonDisabled}
                       
                        />
                        <div className="manufacturing-text">{this.props.autoClippersPerSec}</div>
                    </div>
                    <div className="manufacturing-text">Cost: ${this.props.autoClippersPerSec === 0 ? this.props.autoClipperInitPrice : this.props.autoClipperPrice}</div>
                </div>  
            )
        }
    }

    getRandomDelay = () => {
        let a = Math.floor(Math.random()*15000) + 5000;
        console.log(a)
        return a
   
    }

    getRandomNumber = () => {
        return Math.floor(Math.random()*20) + 10;
    }

    componentDidMount () {
        this.interval = setInterval(()=>{
            this.props.randomWirePrice(this.getRandomNumber())
        }, this.getRandomDelay());

        this.intervalCheckButton = setInterval(()=>{
            this.props.checkButtons();
            this.props.checkExistenceOfWire(this.props.wire);
        }, 1000);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
        clearInterval(this.intervalCheckButton);
        clearInterval(this.intervalAutoWireBuyer);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.wireBuyerIsShown !== this.props.wireBuyerIsShown) {
            this.intervalAutoWireBuyer = setInterval(()=>{
                if(this.props.autoWireBuyerIsOn === true){
                    this.props.autoWireBuyer();
                }
            }, 1000);
        }
        if (prevProps.paperClips !== this.props.paperClips) {
            if(this.props.paperClips === 500000){
                this.props.addMegaClippers();
            }
        }
      
        if (prevProps.autoClipperInitPrice !== this.props.autoClipperInitPrice) {
            if(this.props.autoClipperInitPrice === 5){
                this.props.sendCommentToTerminal("AutoClippers available for purchase");
            }
        }
       
       
    }
    
    wireButtonToggle = () => {
        this.props.startBuyingWire();
        this.props.clickWireButton();
    }

    renderAutoWireBuyer = () => {
        if(this.props.wireBuyerIsShown){
            return(
                <div className="manufacturing-wrapper3">
                    <Button
                        onClick={this.props.toggleAutoWireBuyer}
                        text={"WireBuyer"}
                        // disabled={this.props.wireButtonDisabled}
                    />
                    <div className="manufacturing-text">{this.props.autoWireBuyerIsOn ? "ON" : "OFF"}</div>
                </div>
            )
        }
    }

    /**
    * Markup
    */

    render(){
        return(
            <div className="manufacturing">
                <div className="manufacturing-label">Manufacturing</div>
                <div className="manufacturing-line"/>
                <div className="manufacturing-section">
                    <div className="manufacturing-text">Clips per Second: {this.props.clipsPerSec}</div>
                </div>
                <div className="manufacturing-section">
                    {this.renderAutoWireBuyer()}
                    <div className="manufacturing-wrapper1">
                        <Button
                            onClick={this.wireButtonToggle}
                            text={"Wire"}
                            disabled={this.props.wireButtonDisabled}
                            id={"wireButton"}
                                 // buttonRef={this.buttonRef}
                        />
                        <div className="manufacturing-text">{this.props.wire} inches</div>
                    </div>
                    <div className="manufacturing-text">Cost: $ {this.props.wirePrice}</div>
                </div> 
                {this.renderAutoClippers()}
                {this.renderMegaClippers()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            wire: state.business.wire,
            funds: state.business.funds,
            wirePrice: state.business.wirePrice,
            wireButtonDisabled: state.business.wireButtonDisabled,
            autoClippersPerSec: state.business.autoClippersPerSec,
            autoClipperInitPrice: state.business.autoClipperInitPrice,
            autoClipperPrice: state.business.autoClipperPrice,
            autoClippersButtonDisabled: state.business.autoClippersButtonDisabled,
            paperclipPrice: state.business.paperclipPrice,
            delay: state.business.delay,
            delayAutoPaperClippers: state.business.delayAutoPaperClippers,
            wire: state.business.wire,
            noWire: state.business.noWire,
            wireBuyerIsShown: state.business.wireBuyerIsShown,
            autoWireBuyerIsOn: state.business.autoWireBuyerIsOn,
            paperClips: state.business.paperClips,
            megaClippersIsShown: state.business.megaClippersIsShown,
            clipsPerSec: state.business.clipsPerSec
        };
    },
    (dispatch) => {
        return {
            checkButtons: bindActionCreators(Actions.checkButtons, dispatch),
            startBuyingWire: bindActionCreators(Actions.startBuyingWire, dispatch),
            randomWirePrice: bindActionCreators(Actions.randomWirePrice, dispatch),
            autoPaperclips: bindActionCreators(Actions.autoPaperclips, dispatch),
            makePaperclip: bindActionCreators(Actions.makePaperclip, dispatch),
            checkExistenceOfWire: bindActionCreators(Actions.checkExistenceOfWire, dispatch),
            sendCommentToTerminal: bindActionCreators(Actions.sendCommentToTerminal, dispatch),
            clickWireButton: bindActionCreators(Actions.clickWireButton, dispatch),
            autoWireBuyer: bindActionCreators(Actions.autoWireBuyer, dispatch),
            toggleAutoWireBuyer: bindActionCreators(Actions.toggleAutoWireBuyer, dispatch),
            addMegaClippers: bindActionCreators(Actions.addMegaClippers, dispatch),
        };
    }
)(Manufacturing);
