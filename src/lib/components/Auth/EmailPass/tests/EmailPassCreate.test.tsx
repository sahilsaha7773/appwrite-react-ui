
import React, { useState } from 'react';
import Enzyme, { render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Client } from "appwrite";
import EmailPassCreate from "../EmailPassCreate";

Enzyme.configure({ adapter: new Adapter() });

const client = new Client()
  .setEndpoint('http://localhost:80/v1') // Your API Endpoint
  .setProject('641d6401ae3f0be3c88f');

describe("EmailPassCreate", () => {
  describe("UI tests", () => {
    test("renders without crashing", () => {
      const wrapper = Enzyme.shallow(<EmailPassCreate
        client={client}
        success={() => { }}
        failure={() => { }} />);
      var elems = wrapper.containsAllMatchingElements(
        [
          <input type="email" placeholder="Email" />,
          <input type="password" placeholder="Password" />,
          <button>Create Account</button>
        ]
      );
      expect(elems).toEqual(true);
    });
    test("renders name input", () => {
      const wrapper = Enzyme.shallow(<EmailPassCreate
        nameRequired={true}
        client={client}
        success={() => { }}
        failure={() => { }}
      />);
      var elems = wrapper.containsAllMatchingElements(
        [
          <input type="text" placeholder="Name" />,
        ]
      );
      expect(elems).toEqual(true);
    });
    test("renders with custom button text", () => {
      let wrapper = Enzyme.shallow(<EmailPassCreate
        client={client}
        success={() => { }}
        failure={() => { }}
        buttonText="Sign up" />);
      var btn = wrapper.find("button").text();
      expect(btn).toEqual("Sign up");
    });
  });
  describe("Functionality tests", () => {
    var wrapper: Enzyme.ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    // const init = "";
    // useStateSpy.mockImplementation(() => ["", setState]);
    beforeEach(() => {
      wrapper = Enzyme.shallow(<EmailPassCreate
        client={client}
        success={() => { }}
        failure={() => { }}
        buttonText="Login" />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

  });
});