var Form = React.createClass({
  mixins: [
    CssClassMixin,
    ContainerMixin,
    FormErrorHandlerMixin,
    FormSuccessHandlerMixin
  ],

  propTypes: {
    inputs: React.PropTypes.object,
    data: React.PropTypes.object,
    action: React.PropTypes.string,
    method: React.PropTypes.string,
    dataType: React.PropTypes.string,
    contentType: React.PropTypes.string,
    style: React.PropTypes.string,
    resource: React.PropTypes.string,
    submitButton: React.PropTypes.object,
    otherButtons: React.PropTypes.array,
    isLoading: React.PropTypes.bool,
    onSubmit: React.PropTypes.func,
    onReset: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      inputs: {},
      data: {},
      action: '',
      method: 'POST',
      dataType: undefined,
      contentType: undefined,
      submitButton: {
        name: 'actions.send',
        icon: 'send'
      },
      otherButtons: [],
      isLoading: false,
      themeClassKey: 'form',
      style: 'default',
      resource: null,
      onSubmit: function(event, postData) {},
      onReset: function(event) {}
    };
  },

  getInitialState: function() {
    return {
      isLoading: null
    };
  },

  propsToForward: function() {
    return ['resource', 'data'];
  },

  propsToForwardMapping: function() {
    return {
      errors: this.state.errors,
      formStyle: this.props.style
    };
  },

  render: function() {
    return (
      <form action={this.props.action}
        id={this.props.id}
        onSubmit={this.handleSubmit}
        onReset={this.props.onReset}
        className={this.className()}
        ref="form">

        {this.renderFlashErrors()}
        {this.renderFlashSuccess()}
        {this.renderInputs()}
        {this.renderChildren()}

        <div className={Realize.themes.getCssClass('form.buttonGroup')}>
          {this.renderOtherButtons()}
          {this.renderSubmitButton()}
        </div>
      </form>
    );
  },

  renderSubmitButton: function(){
    if (!_.isEmpty(this.props.inputs) && this.isAllInputsFilterHidden()){
      return '';
    }

    var submitButton = [];
    submitButton.push(<Button {...this.submitButtonProps()} ref="submitButton" />);
    return submitButton;
  },

  renderInputs: function() {
    if(!this.props.inputs || $.isEmptyObject(this.props.inputs)) {
      return '';
    }

    return <InputGroup {...this.propsWithoutCSS()} formStyle={this.props.style} errors={this.state.errors} />;
  },

  renderOtherButtons: function() {
    if (!_.isEmpty(this.props.inputs) && this.isAllInputsFilterHidden()){
      return '';
    }

    var otherButtonsProps = this.props.otherButtons;
    var otherButtons = [];

    for(var i = 0; i < otherButtonsProps.length; i++) {
      var otherButtonProps = otherButtonsProps[i];
      otherButtons.push(<Button {...otherButtonProps} key={otherButtonProps.name} />);
    }

    return otherButtons;
  },

  isAllInputsFilterHidden: function(){
    allIsHidden = true;
    var inputs = this.props.inputs;
    for( var property in inputs ){
      if (inputs[property].component !== 'hidden')
        return allIsHidden = false;
    }

    return allIsHidden;
  },

  submitButtonProps: function() {
    var isLoading = this.isLoading();
    return $.extend({}, this.props.submitButton, {
      type: "submit",
      disabled: isLoading,
      isLoading: isLoading
    });
  },

  handleSubmit: function(event) {
    event.nativeEvent.preventDefault();
    var postData = this.serialize();
    this.props.onSubmit(event, postData);

    if(!event.isDefaultPrevented()) {
      this.setState({isLoading: true, errors: {}, showSuccessFlash: false});
      this.submit(postData);
    }
  },

  serialize : function() {
    var form = React.findDOMNode(this.refs.form);
    return $(form).serializeObject();
  },

  submit: function(postData) {
    var submitOptions = {
      url: this.props.action,
      method: this.props.method,
      data: postData,
      success: this.handleSuccess,
      error: this.handleError
    };

    if(!!this.props.dataType) {
      submitOptions.dataType = this.props.dataType;
    }

    if(!!this.props.contentType) {
      submitOptions.contentType = this.props.contentType;

      if(submitOptions.contentType == "application/json") {
        submitOptions.data = JSON.stringify(postData);
      }
    }

    $.ajax(submitOptions);
  },

  isLoading: function() {
    var isLoading = this.state.isLoading;
    if(isLoading === null) {
      isLoading = this.props.isLoading;
    }

    return isLoading;
  }
});
