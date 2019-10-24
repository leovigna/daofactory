export default {
  items: [
    {
      title: true,
      name: "Create",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "" // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Create Token",
      url: "/create/token",
      icon: "icon-pencil"
    },
    {
      name: "Create Crowdsale",
      url: "/create/crowdsale",
      icon: "icon-pencil"
    },
    {
      title: true,
      name: "Contracts",
      wrapper: {
        element: "",
        attributes: {}
      }
    },
    {
      name: "My Contracts",
      url: "/contracts/mycontracts",
      icon: "icon-star"
    }
  ]
}
