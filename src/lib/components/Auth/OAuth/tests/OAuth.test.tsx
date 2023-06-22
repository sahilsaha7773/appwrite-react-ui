import { Client } from "appwrite";
import Enzyme, { render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import OAuth from "../OAuth";

Enzyme.configure({ adapter: new Adapter() });
const client = new Client()
  .setEndpoint('http://localhost:80/v1') // Your API Endpoint
  .setProject('641d6401ae3f0be3c88f');

describe("OAuth", () => {
  describe("UI tests", () => {
    test("renders without crashing", () => {
      const wrapper = Enzyme.shallow(<OAuth
        client={client}
        provider="google"
        success=""
        failure=""
        buttonText="google" />);
      var elems = wrapper.containsAllMatchingElements(
        [
          <button><i className={`icon-google`} /> google</button>
        ]
      );
      expect(elems).toEqual(true);
    });

  });
});