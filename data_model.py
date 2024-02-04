"""

model = {
    "camera_id": {
        "location": "string",
        "last_updated": "datetime",
        "updated": "bool",
        "car_data": {
            "car_id": {
                "in_frame": "bool",
                "time_of_entry": "datetime",
                "time_of_exit": "datetime" | "None",
                # "car_make": "string",
                # "car_model": "string",
                # "car_color": "string",
                "car_x_vals": "list",
                "car_y_vals": "list",
                "car_y_pred": "list",
                "mean_squared_error": "float" | "None",
            }
        }
    }
}

model_update_slice = {
    "camera_id": {
        "car_id": {
            "car_x_vals": "list",
            "car_y_vals": "list",
        }
    }
}

"""
# update loop
for camera_id in model_update_slice.keys():
    camera_data = model.get(camera_id)
    # if it's an new camera, add it to the model
    if not camera_data:
        model[camera_id] = {
            "location": "string",
            "last_updated": time.now(),
            "updated": True,
            "car_data": {}
        }
        camera_data = model[camera_id]
    # update the last updated time
    camera_data["last_updated"] = time.now()
    camera_data["updated"] = True
    # loop over cars from the camera update
    for car_id in model_update_slice[camera_id].keys():
        car_data = camera_data["car_data"].get(car_id)
        # if it's a new car, add it to the model
        if not car:
            camera_data["car_data"][car_id] = {
                "last_updated": time.now(),
                "time_of_entry": time.now(),
                "time_of_exit": None,
                "car_x_vals": [],
                "car_y_vals": [],
                "car_y_pred": [],
                "mean_squared_error": None,
            }
            car_data = camera_data["car_data"][car_id]
        # update the car data
        car_data["car_x_vals"].append(
            model_update_slice[camera_id][car_id]["car_x_vals"])
        car_data["car_y_vals"].append(
            model_update_slice[camera_id][car_id]["car_y_vals"])
        # update the last updated time
        car_data["last_updated"] = time.now()
        car_data["in_frame"] = True

# now loop over all cameras and cars, if they didn't get updated, perform regressions and update the model
for camera_id, camera_data in model.items():
    if not camera_data["updated"]:
        # should do something here such as mark the camera as inactive
        continue
    for car_id, car_data in camera_data["car_data"].items():
        if car_data["in_frame"]:
            # if the car is still in frame then we can continue to collect data until it goes out of frame
            car_data["in_frame"] = False
            continue
        # perform regression
        regression = linear_model.LinearRegression()
        x = np.array(car_data["car_x_vals"]).reshape(-1, 1)
        y = np.array(car_data["car_y_vals"])
        regression.fit(x, y)
        y_pred = regression.predict(x)
        car_data["car_y_pred"] = y_pred
        car_data["mean_squared_error"] = mean_squared_error(y, y_pred)
