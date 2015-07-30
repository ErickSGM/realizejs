var Form = React.createClass({
  propTypes: {
    inputs: React.PropTypes.object,
    action: React.PropTypes.string,
    method: React.PropTypes.string,
    dataType: React.PropTypes.string,
    onSuccess: React.PropTypes.func,
    onError: React.PropTypes.func,
    onSubmit: React.PropTypes.func,
    onReset: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      action: '',
      method: 'POST',
      dataType: 'json',
      onSuccess: function(data) {
        return true;
      },
      onError: function(xhr, status, error) {
        return true;
      },
      onSubmit: function(event) {
        return true;
      },
      onReset: function(event) {
        return true;
      }
    };
  },

  render: function() {
    return (
      <form action={this.props.action}
        id={this.props.id}
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
        ref="form">

        {this.renderInputs()}
        {this.props.children}
      </form>
    );
  },

  renderInputs: function() {
    var inputsProps = this.props.inputs;
    var inputComponents = [];

    for(var inputName in inputsProps) {
      if(inputsProps.hasOwnProperty(inputName)) {
        var inputProps = inputsProps[inputName];
        inputComponents.push(<Input {...inputProps} id={inputName} key={inputName} ref={"input_" + inputName} />);
      }
    }

    return inputComponents;
  },

  serialize : function() {
    var form = React.findDOMNode(this.refs.form);
    return $(form).serializeObject();
  },

  handleSubmit: function(event) {
    event.preventDefault();

    if(this.props.onSubmit(event)) {
      var postData = this.serialize();
      this.submit(postData);
    }
  },

  submit: function(postData) {
    $.ajax({
      url: this.props.action,
      method: this.props.method,
      dataType: this.props.dataType,
      data: postData,
      success: function(data) {
        this.props.onSuccess(data);
      }.bind(this),
      error: function(xhr, status, error) {
        this.props.onError(xhr, status, error);
      }.bind(this)
    });
  },

  handleReset: function(event) {
    var refInputs = this.getRefInputs();
    for(var i = 0; i < refInputs.length; i++) {
      var refInput = refInputs[i];
      var inputNode = React.findDOMNode(refInput);

      inputNode.value = "";
      refInput.onChange({currentTarget: inputNode});
    }

    this.props.onReset(event);
  },

  getRefInputs: function() {
    var refInputs = [];
    var refs = this.refs;

    for(var refName in refs) {
      if(refs.hasOwnProperty(refName)) {
        var ref = refs[refName];
        if(refName.match(/^input_/)) {
          refInputs.push(ref);
        }
      }
    }

    return refInputs;
  }

});