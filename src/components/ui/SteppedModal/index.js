import { h, Component } from 'preact';
import Modal from '../Modal';

/**
 * Modal in several steps.
 */
export default class SteppedModal extends Component {

    /**
     * called after the SteppedModal is opened.
     */
    onAfterOpen() {
        if (this.props.onAfterOpen) {
            this.props.onAfterOpen();
        }
    }

    /**
     * called after the SteppedModal is closed.
     * @param {Event} requestClosed - the event.
     * @param {Boolean} lastStepSuccess - whether the last step succeeded.
     */
    onRequestClose(requestClosed = null, lastStepSuccess = false) {
        if (!(this.state.mustSucceed || this.props.steps[this.state.step].mustSucceed ) || lastStepSuccess) {
            if (this.props.beforeClose) {
                this.props.beforeClose(lastStepSuccess);
            }
            this.setState({ step: 0 });
            this.props.handleCloseModal();
        }
    }

    onSkipStep() {
        if (this.state.previousAction === 'next' || this.state.previousAction === 'enter') {
            return this.onNextStep();
        } else {
            return this.onPreviousStep();
        }
    }


    /**
     * Triggers the next step. If the last step is reached, closes the modal.
     * @param {Object} result - the result of the current step, to be appended the `state.params`.
     */
    onNextStep(result = {}) {
        const state = this.state;

        if (this.state.step + 1 >= this.props.steps.length) { // if last step
            this.onRequestClose(null, true);
        } else {
            this.setState({
                step: (state.step + 1),
                params: { ...state.params, ...result },
                previousAction: 'next',
                mustSucceed: false
            });
        }
    }

    /**
     * Triggers the previous step. If the current step is the first step, the modal is closed.
     * @param {Object} params - the params to be appended to `state.params`.
     */
    onPreviousStep(params = {}) {
        const state = this.state;
        if (this.state.step === 0) {
            this.onRequestClose();
        } else {
            this.setState({
                step: (state.step - 1),
                params: { ...state.params, ...params },
                previousAction: 'previous',
                mustSucceed: false
            });
        }
    }

    /**
     * if triggered, it will no longer be possible to cancel the current step.
     */
    forbidCancel() {
        this.setState({ mustSucceed: true });
    }

    /**
     * Computes the title of the current step.
     * @return {String} the current step.
     */
    computeCurrentTitle() {
        if (this.state.step >= this.props.steps.length) {
            return 'Loading';
        }
        return this.props.steps[this.state.step].title;
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
    constructor(props) {
        super(props);
        this.state = {
            params: {},
            step: 0,
            previousAction: 'enter',
            mustSucceed: false
        };
    }

    /**
     * renders the current step.
     * @return {Component}
     */
    renderCurrentStep() {
        if (this.state.step >= this.props.steps.length) {
            return null;
        }
        return this.props.steps[this.state.step].component({
            params: this.state.params,
            onNextStep: this.onNextStep.bind(this),
            onPreviousStep: this.onPreviousStep.bind(this),
            onSkipStep: this.onSkipStep.bind(this),
            forbidCancel: this.forbidCancel.bind(this)
        });
    }

    render() {
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
