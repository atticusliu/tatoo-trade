import CreateProductButton from "@/components/CreateProductButton";

// do I even need this?
const handleSubmit = async (e:Event) => {
  e.preventDefault();
  // handle form submission here
  console.log()
}


export default function CreateProduct() {
  return (
    <div className="container mx-auto w-1/2">
      <h1 className="text-2xl pb-8">Create a Product</h1>

      <form className="flex flex-col mx-auto">
        <div className="flex flex-col pb-8">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="description">Description</label>
          <textarea id="description"></textarea>
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="category">Category</label>
          <select id="category">
            <option value="tattoo_machines">Tattoo Machines</option>
            <option value="flash_material">Flash Material</option>
            <option value="books">Books</option>
            <option value="inks">Inks</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="price">Price</label>
          <input type="currency" id="price" placeholder="0.00" />
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" />
        </div>

        <div className="flex flex-col pb-8">
          <label htmlFor="condition">Condition</label>
          <select id="condition">
            <option value="new">New</option>
            <option value="like_new">Used - Like New</option>
            <option value="good">Used - Good</option>
            <option value="fair">Used - Fair</option>
          </select>
        </div>
      </form>

      <CreateProductButton />
    </div>
  );
}