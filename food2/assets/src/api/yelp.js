import axios from "axios";

export default axios.create({

    baseURL: `https://api.yelp.com/v3/businesses`,
    headers: {
      Authorization: `Bearer IAbxsTDhUb1bDeo5oIxY420HU6_fz0pmN5Dy1Ocve7RO_oTzhJ_x4dWF6ADj_h_PUr6_mmTUOyzRx5oqYh-CUCiyihqHLQzn4Zve2i-BOws1_5l9VyXNCaQlMi5RXnYx`
    }
});
