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

/**
* Components
*/

import Card from '../../SmallParts/Card/card';

/**
* Styles
*/

import './projects.scss';

/**
* Actions
*/

import * as Actions from '../../../../actions';

/**
* Const
*/

import * as projectsToAdd from '../../../../constants/projectsToAdd';

/**
* Projects component definition and export
*/

class Projects extends Component {

    /**
    * Constructor
    */

    constructor (props){
        super(props);
        this.state = {
            card1:  {
                text1: "Improved AutoClippers (750 ops)",
                text2 : "Increases AutoClipper performance 25%",
                price: {
                    ops: 5
                },
                action: 25,
                next: 'AutoClippers25',
                valid: false,
                id: "card1",
                terminal: "AutoClippper performance boosted by 25%"
            },
            card2: {
                text1: "Improved Wire Extrusion (1,750 ops)",
                text2 : "50% more wire supply from every spool",
                price: {
                    ops: 5
                },
                action: 50,
                next: 'wireExtrusion50',
                valid: false,
                id: "card2",
                terminal: "Wire extrusion technique improved, 1,500 supply from every spool"
            },
            card3: {
                text1: "RecTracker (500 ops)",
                text2 : "Automatically calculates average revenue",
                text3 : "per second",
                price: {
                    ops: 5
                },
                action: null,
                next: 'showRevTracker',
                valid: false,
                id: "card3",
                terminal: "RevTracker online"
            }
        }
    }

    handleOnClick = (id, next, price, action) => {
        this.props.deleteCard(id);
        switch(next){
            case 'showRevTracker':
                this.props.showRevTracker(price.ops);
                break;
            case 'AutoClippers25':
                this.props.addProject(projectsToAdd.AutoClippers50);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveAutoClippers(action); //change logic
                if(this.props.autoClipperOn){
                    this.props.stop();
                    this.props.autoPaperclipsStart(this.props.paperclipPrice, this.props.delay, this.props.delayAutoPaperClippers, this.props.wire);
                }
                break;
            case 'autoClippers50':
                this.props.addProject(projectsToAdd.OptimizedAutoClippers75);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveAutoClippers(action);//change logic
                if(this.props.autoClipperOn){
                    this.props.stop();
                    this.props.autoPaperclipsStart(this.props.paperclipPrice, this.props.delay, this.props.delayAutoPaperClippers, this.props.wire);
                }
                break;
            case 'autoClippers75':
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveAutoClippers(action);//change logic
                if(this.props.autoClipperOn){
                    this.props.stop();
                    this.props.autoPaperclipsStart(this.props.paperclipPrice, this.props.delay, this.props.delayAutoPaperClippers, this.props.wire);
                }
                break;
            case 'wireExtrusion50':
                this.props.addProject(projectsToAdd.WireExtrusion75);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveWireExtrusion(action);
                break;
            case 'wireExtrusion75':
                this.props.addProject(projectsToAdd.MicrolatticeShapecasting100);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveWireExtrusion(action);
                break;
            case 'microlatticeShapecasting100':
                this.props.addProject(projectsToAdd.SpectralFrothAnnealment200);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveWireExtrusion(action);
                break;
            case 'spectralFrothAnnealment200':
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveWireExtrusion(action);
                break;
            case 'creativity':
                this.props.addProject(projectsToAdd.Limerick);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.creativityTurnOn();
                break;
            case 'lexicalProcessing':
                this.props.addProject(projectsToAdd.NewSlogan);
                this.props.addProject(projectsToAdd.AlgorithmicTrading);
                this.props.removePriceOfProjectCreat(price.creat);
                this.props.trustPlusOneFromProject();
                break;
            case 'newSlogan':
                this.props.removePriceOfProjectOpsAndCreat(price.ops, price.creat);
                this.props.improveMarketing(action);
                break;
            case 'algorithmicTrading':
                this.props.removePriceOfProjectOps(price.ops);
                this.props.showInvestEngine();
                break;
            case 'combinatoryHarmonics':
                this.props.addProject(projectsToAdd.CatchyJingle);
                this.props.removePriceOfProjectCreat(price.creat);
                this.props.trustPlusOneFromProject();
                break;
            case 'catchyJingle':
                this.props.addProject(projectsToAdd.HypnoHarmonics);
                this.props.removePriceOfProjectOpsAndCreat(price.ops, price.creat);
                this.props.improveMarketing(action)
                break;
            case 'hypnoHarmonics':
                this.props.addProject(projectsToAdd.HypnoDrones);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveMarketing(action)
                break;
            case 'hypnoDrones':
                this.props.addProject(projectsToAdd.ReleaseTheHypnoDrones);
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveMarketing(action)
                break;
            case 'releaseTheHypnoDrones':
                this.props.removePriceOfProjectTrust(price.trust);
                this.props.improveMarketing(action)
                break;
            case 'theHadwigerProblem':
                this.props.addProject(projectsToAdd.HadwigerClipDiagrams);
                this.props.removePriceOfProjectCreat(price.creat);
                this.props.trustPlusOneFromProject();
                break;
            case 'hadwigerClipDiagrams':
                this.props.removePriceOfProjectOps(price.ops);
                this.props.improveAutoClippers(action);
                // if(this.props.autoClipperOn){
                //     this.props.stop();
                //     this.props.autoPaperclipsStart(this.props.paperclipPrice, this.props.delay, this.props.delayAutoPaperClippers, this.props.wire);
                // } in progress //change logic
                break;
            case 'theTothSausageConjecture':
                this.props.removePriceOfProjectCreat(price.creat);
                break;
                   
        }


        
    }

    /**
    * Methods
    */

    renderCards = () => {
        return(
            <div>
                {this.props.cards.map((el,i)=>{
                    if(el){
                        return(
                            <Card
                                key={el.id}
                                onClick={() => this.handleOnClick(el.id, el.next, el.price, el.action)}
                                valid={el.valid}
                                priceOps={el.price.ops}
                                priceCreat={el.price.creat}
                                priceTrust={el.price.trust}
                                id={el.id}
                                action={el.action}
                                i={i}
                            >
                                <div>{el.text1}</div>
                                <div>{el.text2}</div>
                                {el.text3 ? <div>{el.text3}</div> : null}
                            </Card>
                        )
                    }
                   
                })}
            </div>
        )        
    }

    componentWillMount = () => {
        this.props.initProjects(this.state.card1, this.state.card2, this.state.card3)
    }

    // componentWillMount = () => {
    //     this.props.initProjects(this.state.card1, this.state.card2, this.state.card3)
    // }
    
    /**
    * Markup
    */

    render(){
        return(
            <div className="projects">
                <div className="projects-label">Projects</div>
                <div className="projects-line"/>
                {this.renderCards()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            cards: state.business.cards,
            paperclipPrice: state.business.paperclipPrice,
            wire: state.business.wire,
            delay: state.business.delay,
            delayAutoPaperClippers: state.business.delayAutoPaperClippers,
            ops: state.business.ops,
            opsMax: state.business.opsMax,
            autoClipperOn: state.business.autoClipperOn
        };
    },
    (dispatch) => {
        return {
            initProjects: bindActionCreators(Actions.initProjects, dispatch),
            deleteCard: bindActionCreators(Actions.deleteCard, dispatch),
            showRevTracker: bindActionCreators(Actions.showRevTracker, dispatch),
            addProject: bindActionCreators(Actions.addProject, dispatch),
            removePriceOfProjectOps: bindActionCreators(Actions.removePriceOfProjectOps, dispatch),
            removePriceOfProjectCreat: bindActionCreators(Actions.removePriceOfProjectCreat, dispatch),
            removePriceOfProjectTrust: bindActionCreators(Actions. removePriceOfProjectTrust, dispatch),
            removePriceOfProjectOpsAndCreat: bindActionCreators(Actions.removePriceOfProjectOpsAndCreat, dispatch),
            improveAutoClippers: bindActionCreators(Actions.improveAutoClippers, dispatch),
            stop: bindActionCreators(Actions.stop, dispatch),
            autoPaperclipsStart: bindActionCreators(Actions.autoPaperclipsStart, dispatch),
            improveWireExtrusion: bindActionCreators(Actions.improveWireExtrusion, dispatch),
            creativityTurnOn: bindActionCreators(Actions.creativityTurnOn, dispatch),
            trustPlusOneFromProject: bindActionCreators(Actions.trustPlusOneFromProject, dispatch),
            improveMarketing: bindActionCreators(Actions.improveMarketing, dispatch),
            showInvestEngine: bindActionCreators(Actions.showInvestEngine, dispatch),
            
        };
    }
)(Projects);