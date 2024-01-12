// session管理
export const queryResult3 = {
  records: [
    [
      {
        id: 0,
        labels: ["person"],
      },
      {
        id: 163,
        type: "know",
        start_node: {
          id: 0,
          labels: ["person"],
        },
        end_node: {
          id: 13,
          labels: [],
        },
      },
      "0.0",
    ],
    [
      {
        id: 1,
        labels: ["person"],
      },
      {
        id: 1,
        type: "dont know",
        start_node: {
          id: 1,
          labels: ["person"],
        },
        end_node: {
          id: 21,
          labels: [],
        },
      },
      "0.0",
    ],
    [
      {
        id: 5,
        labels: ["xigua"],
      },
      {
        id: 59,
        type: "吃了",
        start_node: {
          id: 7,
          labels: ["person"],
        },
        end_node: {
          id: 5,
          labels: [],
        },
      },
      "0.0",
    ],
    [
      {
        id: 101,
        labels: ["dapi"],
      },
      {
        id: 65,
        type: "揍了",
        start_node: {
          id: 101,
          labels: ["dapi"],
        },
        end_node: {
          id: 102,
          labels: ['yangmei'],
        },
      },
      "0.0",
    ],
    [
      {
        id: 0,
        labels: ["person"],
      },
      {
        id: 162,
        type: "know",
        start_node: {
          id: 0,
          labels: ["person"],
        },
        end_node: {
          id: 186,
          labels: [],
        },
      },
      "0.0",
    ],
    [
      {
        id: 0,
        labels: ["person"],
      },
      {
        id: 51,
        type: "know",
        start_node: {
          id: 0,
          labels: ["person"],
        },
        end_node: {
          id: 240,
          labels: [],
        },
      },
      "0.0",
    ],
    [
      {
        id: 0,
        labels: ["person"],
      },
      {
        id: 58,
        type: "know",
        start_node: {
          id: 0,
          labels: ["person"],
        },
        end_node: {
          id: 281,
          labels: [],
        },
      },
      "0.0",
    ],
    [
      {
        id: 0,
        labels: ["person"],
      },
      {
        id: 62,
        type: "know",
        start_node: {
          id: 0,
          labels: ["person"],
        },
        end_node: {
          id: 311,
          labels: [],
        },
      },
      "0.0",
    ],
    [
      {
        id: 0,
        labels: ["person"],
      },
      {
        id: 82,
        type: "know",
        start_node: {
          id: 0,
          labels: ["person"],
        },
        end_node: {
          id: 399,
          labels: [],
        },
      },
      "0.0",
    ],
    [
      {
        id: 0,
        labels: ["person"],
      },
      {
        id: 83,
        type: "know",
        start_node: {
          id: 0,
          labels: ["person"],
        },
        end_node: {
          id: 422,
          labels: [],
        },
      },
      "0.0",
    ],
  ],
  summary: {
    query: "match (n)-[e]->(w) return n,e, n.feat_1 limit 10",
    fields: ["n", "e", "feat_1"],
    types: ["Node", "Relationship", "float"],
  },
}
