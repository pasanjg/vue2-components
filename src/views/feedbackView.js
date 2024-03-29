export const FeedbackView = {
  data() {
    return {

    };
  },
  methods: {
    getUpdatedFeedback(rating) {
      console.debug(rating);
    }
  },
  template:
    `
  <div>
    <h3>Feedback</h3>
    <br />

    <h6>Fixed value <code>value="3"</code></h6>
    <fv-feedback id="demoFeed" class-name="d-inline" value="3" /> <br />
    <br />

    <h6>Editable <code>editable="true" @onSelect="getUpdatedFeedback"</code></h6>
    <fv-feedback id="demoFeed2" class-name="d-inline" editable="true" @onSelect="getUpdatedFeedback" /> <br />
    <br />

    <h6>Customize <code>size="36px" color="red"</code> (default <code>size="30px" color="#FFB703"</code>)</h6>
    <fv-feedback id="demoFeed3" class-name="d-inline" size="36px" color="red" /> <br /> <br />
  </div>
  `,
};
