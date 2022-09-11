import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import Button from "../UI-Elements/ButtonComponent/ButtonComponent";
import "./yTSHomepage.scss";

const YTSHomepage = (props:any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    props.searchYTS(data)
  };
  return (
    <React.Fragment>
      <div className="yTSHomePageContainer">
        <div className="yTSHomePageFlex">
          <div className="headingLHS">
            <h2>Youtube Scrapper Project</h2>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </span>
          </div>
          <div className="searchformContainer">
            <h2>Channel Search</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="channnelName">Channel Name</label> <br />
                <input
                  type="text"
                  className="form-control"
                  id="channnelName"
                  autoComplete="off"
                  placeholder="Enter Channel Name"
                  {...register("channnelName", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label htmlFor="videoCount">Video Count</label> <br />
                <input
                  type="number"
                  max={50}
                  className="form-control"
                  id="videoCount"
                  autoComplete="off"
                  placeholder="Enter Video Count"
                  {...register("videoCount", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <Button name="submit" type="submit" />
                <Button name="reset" type="reset" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default YTSHomepage;
