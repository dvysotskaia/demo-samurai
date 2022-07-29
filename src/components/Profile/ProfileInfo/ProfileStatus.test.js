import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatusComponent component", () => {
  test("status from props shoud be in the sate", () => {
    const component = create(<ProfileStatus status="hello" />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe("hello");
  });
  test("input shoudn't be displayed", () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    expect(() => {
      root.findByType("input");
    }).toThrow();
  });
  test("span is on the page", async () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    let span = await root.findByType("span");
    expect(span).not.toBeNull();
  });
  test("text in the span", async () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    let span = await root.findByType("span");
    expect(span.children[0]).toBe("hello");
  });
  test("input should be displayed in EditMode", () => {
    const component = create(<ProfileStatus status="hello" />);
    const root = component.root;
    let span = root.findByType("span");
    span.props.onDoubleClick();
    let input = root.findByType("input");
    expect(input.props.value).toBe("hello");
  });
  test("callback shoud be called", () => {
    const mockCallback = jest.fn();
    const component = create(
      <ProfileStatus status="hello" updateStatus={mockCallback} />
    );
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect (mockCallback.mock.calls.length).toBe(1);
  });
});
