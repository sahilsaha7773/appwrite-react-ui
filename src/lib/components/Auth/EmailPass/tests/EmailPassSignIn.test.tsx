
import React, { useState } from 'react';
import Enzyme, { render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Client } from "appwrite";
import EmailPassSignin from "../EmailPassSignIn";
import { Writable } from "stream";
import fetchMock from "jest-fetch-mock"
import { act } from "react-dom/test-utils";

Enzyme.configure({ adapter: new Adapter() });

const client = new Client()
  .setEndpoint('http://localhost:80/v1') // Your API Endpoint
  .setProject('641d6401ae3f0be3c88f');


describe("EmailPassSignIn", () => {
  describe("UI tests", () => {
    test("renders without crashing", () => {
      const wrapper = Enzyme.shallow(<EmailPassSignin
        client={client}
        success={() => { }}
        failure={() => { }} />);
      var elems = wrapper.containsAllMatchingElements(
        [
          <input type="email" placeholder="Email" />,
          <input type="password" placeholder="Password" />,
          <button>Sign in</button>
        ]
      );
      expect(elems).toEqual(true);
    });
    it("renders with custom button text", () => {
      let wrapper = Enzyme.shallow(<EmailPassSignin
        client={client}
        success={() => { }}
        failure={() => { }}
        buttonText="Login" />);
      var btn = wrapper.find("button").text();
      expect(btn).toEqual("Login");
    });
  });
  describe("Functionality tests", () => {
    var wrapper: Enzyme.ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    // const init = "";
    // useStateSpy.mockImplementation(() => ["", setState]);
    beforeEach(() => {
      wrapper = Enzyme.shallow(<EmailPassSignin
        client={client}
        success={() => { }}
        failure={() => { }}
        buttonText="Login" />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe("Validations", () => {
      test("Should validate email", () => {
        const btn = wrapper.find("button").at(0);
        btn.simulate('click', {
          preventDefault: () => {
          }
        });
        var e = wrapper.contains("Email is required");
        expect(e).toEqual(true);
      });
      test("Should validate password", () => {
        wrapper.find("input").at(0).simulate('change', { target: { value: 'Test' } })
        expect(wrapper.find("input").at(0).prop('value')).toEqual('Test');
        
        const btn = wrapper.find("button").at(0);
        btn.simulate('click', {
          preventDefault: () => {
          }
        });
        var e = wrapper.contains("Password is required");
        expect(e).toEqual(true);
      });
    });

    describe("Account Creation", () => {

      it("Should capture Email correctly onChange", async () => {
        const setStateMock = jest.fn();
        const useStateMock: any = (useState: any) => [useState, setStateMock];
        const cha =   jest.spyOn(React, 'useState');
        const handleClick = jest.spyOn(React, "useState");
        cha.mockImplementation(useStateMock);
        const email = wrapper.find("input").at(0);
        email.simulate('change', { target: { value: 'T' } });
        expect(wrapper.find("input").at(0).prop('value')).toEqual('T');
  //       const changeSize = jest.fn();
  //  const wrapper = mount(<App onClick={changeSize} />);
  //  const handleClick = jest.spyOn(React, "useState");
  //  handleClick.mockImplementation(size => [size, changeSize]);

        // var ss = email.contains("T");
        // expect(ss).toEqual(true);
        expect(cha).toBeCalled();

        wrapper.find("input").at(1).simulate('change', { target: { value: 'Test' } })

      });
    });
  });

});