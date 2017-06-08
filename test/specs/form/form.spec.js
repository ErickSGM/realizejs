import React from 'react'
import $ from 'jquery'
import Realize from 'realize'
import { Form } from 'components/form'
import { assert } from 'chai';
import { shallow } from 'enzyme';

describe('<Form/>', () => {
  let sandbox;
  let instance = shallow(<Grid url={dummyUrl} filter={{method, dataType}} />).instance();

  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  it('exists', () => {
    assert(Form);
  });
  it('renders with the default props', () => {
    const content = shallow(
      <Form />
    );
    assert(content.find('Form'));
  });
  it('renders with isLoading', () => {
    const content = shallow(
      <Form
            isLoading
      />
    );
    assert(content.find('isLoading'));
  });
  it('renders with otherButtons', () => {
    const content = shallow(
      <Form
           otherButtons= {[
               {
                   name: 'actions.clear',
                   icon: 'delete',
                   element: 'button',
                   type: 'reset'
               }
           ]}
       />
    );
    assert(content.find('otherButtons'));
  });
  it('renders with onSubmit', () => {
    const content = shallow(
      <Form
        onSubmit={function(){
         alert('Product Created')
         }}
       />
    );
    assert(content.find('onSubmit'));
  });

  describe('#ajaxSubmit', () => {
    const httpClient = sandbox.stub();
    Realize.config.httpClient = httpClient;
    it('should resolve to handle success on sucessful ajax call', () => {
      const handleSuccess = sandbox.stub(instance, "handleSuccess");
    });

    it('should resolve to handle failure on failed ajax call', () => {
      const handleFailure = sandbox.stub(instance, "handleSuccess");
    });

    it('should call httpClient', () => {
      instance.ajaxSubmit({});
      expect(httpClient).to.be.calledOnce;
    });

    it('should set dataType when the form received the dataType prop', () => {

    });

    it('should set multiPart data when the form received multiPart prop', () => {

    });

    it('should set the content type when its not multi part and received content type prop', () => {

    });

    it('should not set the content type when its multi part', () => {

    });

    it('should pass method props forward', () => {

    });
  });
});
