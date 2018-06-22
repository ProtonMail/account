import { h, Component } from 'preact';
import Modal from '../Modal';

export default class SteppedModal extends Component {
    constructor ( props ) {
        super(props);
        this.state = {
            params: {},
            step: 0
        };
    }

    onAfterOpen () {
        console.debug('SteppedModal opened');
    }

    onRequestClose () {
        this.setState({ step: 0 });
        this.props.handleCloseModal();
        console.debug('SteppedModal closed');
    };

    onNextStep ( result ) {
        const state = this.state;

        if (this.state.step + 1 === this.props.steps.length) { // if last step
            this.onRequestClose();
        } else {
            this.setState({ step: (state.step + 1), params: { ...state.params, ...result } });
        }
    }

    onPreviousStep ( params ) {
        const state = this.state;
        if (this.state.step === 0) {
            this.onRequestClose();
        } else {
            this.setState({ step: (state.step - 1), params: { ...state.params, ...params } });
        }
    }

    computeCurrentTitle () {
        if (this.state.step >= this.props.steps.length) {
            return 'Loading';
        }
        return this.props.steps[ this.state.step ].title;
    }

    renderCurrentStep () {
        if (this.state.step >= this.props.steps.length) {
            return null;
        }
        return this.props.steps[ this.state.step ].component(
            this.state.params,
            this.onNextStep.bind(this),
            this.onPreviousStep.bind(this)
        );
    }

    render () {
        if (!this.props.steps || !this.props.steps.length) return null;
        return (<Modal
            isOpen={this.props.isOpen}
            onAfterOpen={this.onAfterOpen.bind(this)}
            onRequestClose={this.onRequestClose.bind(this)}
            title={this.computeCurrentTitle()}>
            {this.renderCurrentStep()}
        </Modal>);
    }
}
