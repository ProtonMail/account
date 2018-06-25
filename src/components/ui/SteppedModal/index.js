import { h, Component } from 'preact';
import Modal from '../Modal';

/**
 * Modal in several steps.
 */
export default class SteppedModal extends Component {

    /**
     * called after the SteppedModal is opened.
     */
    onAfterOpen () {
        console.debug('SteppedModal opened');
        if (this.props.onAfterOpen) {
            this.props.onAfterOpen();
        }
    }

    /**
     * called after the SteppedModal is closed.
     * @param {Event} requestClosed - the event.
     * @param {Boolean} lastStepSuccess - whether the last step succeeded.
     */
    onRequestClose ( requestClosed = null, lastStepSuccess = false ) {
        if (!this.props.steps[ this.state.step ].mustSucceed || lastStepSuccess) {
            this.setState({ step: 0 });
            this.props.handleCloseModal();
            console.debug('SteppedModal closed');
        }
    }

    /**
     * Triggers the next step. If the last step is reached, closes the modal.
     * @param {Object} result - the result of the current step, to be appended the `state.params`.
     */
    onNextStep ( result ) {
        const state = this.state;

        if (this.state.step + 1 === this.props.steps.length) { // if last step
            this.onRequestClose(null, true);
        } else {
            this.setState({ step: (state.step + 1), params: { ...state.params, ...result } });
        }
    }

    /**
     * Triggers the previous step. If the current step is the first step, the modal is closed.
     * @param {Object} params - the params to be appended to `state.params`.
     */
    onPreviousStep ( params ) {
        const state = this.state;
        if (this.state.step === 0) {
            this.onRequestClose();
        } else {
            this.setState({ step: (state.step - 1), params: { ...state.params, ...params } });
        }
    }

    /**
     * Computes the title of the current step.
     * @return {String} the current step.
     */
    computeCurrentTitle () {
        if (this.state.step >= this.props.steps.length) {
            return 'Loading';
        }
        return this.props.steps[ this.state.step ].title;
    }

    /**
     * @constructor
     * @param {Object} props
     * @param props.isOpen - whether the step modal should be opened or not.
     * @param {Object[]} props.steps - the different steps to be proceeded.
     * @param {Component} props.steps[].component - the component of the current step.
     * @param {String} props.steps[].title - the title of the current step.
     * @param {Boolean} [props.steps[].mustSucceed=false] - If the whole process must succeed. If true, the only possibility to close the modal is to click on the final submit button.
     * @param {Function} props.handleCloseModal - to be called when the callback is closed.
     * @param {?Function} props.onAfterOpen - to be called after the modal is opened.
     */
    constructor ( props ) {
        super(props);
        this.state = {
            params: {},
            step: 0
        };
    }

    /**
     * renders the current step.
     * @return {Component}
     */
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
            title={this.computeCurrentTitle()}
        >
            {this.renderCurrentStep()}
        </Modal>);
    }
}
