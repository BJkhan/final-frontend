
import React, { useState } from "react";
import axios from "axios";
import apiUrl from "../../apiConf";
const CalltoActionSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(`${apiUrl}/api/users/subscribe`, { email });
      setSuccess(true);
      setEmail(""); // Clear the email input after successful subscription
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="subscribe-section bg-with-black text-center">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Do you need more tips?</h2>
              <p>Sign up free and get the latest tips.</p>
              <form className="form-section" onSubmit={handleSubmit}>
                <input
                  placeholder="Your Email..."
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input className="btnSub" value="Yes. I want!" name="subscribe" type="submit" />
              </form>
              {error && (
                <div className="alert alert-danger text-center alert-dismissible fade show  mx-auto mt-3" role="alert">
                {error}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              )}
              {success && (
                <div class="alert alert-success alert-dismissible fade show  mx-auto mt-3" role="alert">
                Successfully subscribed
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
