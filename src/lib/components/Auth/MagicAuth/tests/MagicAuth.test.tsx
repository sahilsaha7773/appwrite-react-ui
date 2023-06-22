import { Client } from "appwrite";
import Enzyme, { render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MagicAuth from "../MagicAuth";

Enzyme.configure({ adapter: new Adapter() });
const client = new Client()
  .setEndpoint('http://localhost:80/v1') // Your API Endpoint
  .setProject('641d6401ae3f0be3c88f');

describe("MagicAuth", () => {
  describe("UI tests", () => {
    test("renders without crashing", () => {
      const wrapper = Enzyme.shallow(<MagicAuth
        client={client}
        success={() => { }}
        buttonText="Get Magic Link" />);
      var elems = wrapper.containsAllMatchingElements(
        [
          <input type="email" placeholder="Email" />,
          // <button>Get Magic Link</button>
        ]
      );
      expect(elems).toEqual(true);
    });

  });
  describe("Functionality tests", () => {
    var wrapper: Enzyme.ShallowWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

    beforeEach(() => {
      wrapper = Enzyme.shallow(<MagicAuth
        client={client}
        success={() => { }}
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
    });
  });
});
