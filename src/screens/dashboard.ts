import  "../components/export"
import ArticleCard  from "../components/articless/article";
import firebase from "../utils/firebase"
import { Attributes } from "../components/articless/article";
import style from "./dash.css"

const formPost = {
  name:"",
    quantity: "",
    price: "",
    imageUrl: "",
  };

class Dashboard extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: "open" });
    }

    async uploadform() {
        console.log(formPost)
        firebase.addPost(formPost);
      }

    connectedCallback(){
        this.render();
    }
    changeimg(e: any) {
        formPost.imageUrl = e.target.value; }

    changeprice(e: any) {
         formPost.price = e.target.value; }

    changequantity(e: any) {
        formPost.quantity = e.target.value; }

      changename(e: any) {
          formPost.name = e.target.value; }
  

   async render(){
        if(this.shadowRoot)
        this.shadowRoot.innerHTML= `<style>${style}</style>`

        const Uploadcont = this.ownerDocument.createElement("div");
        Uploadcont.classList.add("Uploadcontainer");
        this.shadowRoot?.appendChild(Uploadcont);

        const title= this.ownerDocument.createElement("h1");
        title.innerHTML = "ADD A PRODUCT";
        title.classList.add("title")

        Uploadcont.appendChild(title);

        const inputimg = this.ownerDocument.createElement("input");
        inputimg.placeholder = "Insert product image";
        inputimg.classList.add("input-img")
        inputimg.addEventListener("change", this.changeimg);

        Uploadcont.appendChild(inputimg);

        const inputname = this.ownerDocument.createElement("input");
        inputname.placeholder = "Insert product name";
        inputname.classList.add("input-name")
        inputname.addEventListener("change", this.changename);

        Uploadcont.appendChild(inputname);
        
        const inputprice = this.ownerDocument.createElement("input");
        inputprice.classList.add("input-style")
        inputprice.placeholder = "Enter the price of the product";
        inputprice.addEventListener("change", this.changeprice);
        inputprice.classList.add("input-price");

        Uploadcont.appendChild(inputprice);

        const inputquantity = this.ownerDocument.createElement("input");
        inputquantity.classList.add("input-style")
        inputquantity.placeholder = "How many products do you want";
        inputquantity.addEventListener("change", this.changequantity);
        inputquantity.classList.add("input-quantity");

        Uploadcont.appendChild(inputquantity);


        const butn = this.ownerDocument.createElement("button");
        butn.innerHTML = "Upload";
        butn.addEventListener("click", this.uploadform);
        butn.classList.add("mi-butn");
       
    Uploadcont.appendChild(butn);


    const articleContainer = this.ownerDocument.createElement("div");
    articleContainer.classList.add("article-container");
    console.log(firebase)
    const articles = await firebase.getPost();
    articles.forEach((articleposts: any) => {
      const card = this.ownerDocument.createElement("article-card") as ArticleCard;
      card.setAttribute(Attributes.img, articleposts.imageUrl);
      card.setAttribute(Attributes.name, articleposts.name);
      card.setAttribute(Attributes.quantity, articleposts.quantity);
      card.setAttribute(Attributes.price, articleposts.price);
      
      articleContainer.appendChild(card);
    });

    this.shadowRoot?.appendChild(articleContainer);
  }
}
customElements.define("app-dashboard", Dashboard);