import { fileUpload } from "../../helpers/fileUpload";

import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "domw6ewde",
  api_key: "162986139524112",
  api_secret: "dg516hSPk07MDkuLnAA10rdfQx8",
});
describe("testing_fileUpload_fiel", () => {
  test("should_upload_a_file_and_return_a_url", async () => {
    const resp = await fetch(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
    );
    const blob = await resp.blob();

    const file = new File([blob], "foto.png");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");
     cloudinary.v2.api.delete_resources(imageId, {}, () => {
     
    });
   
  });

  test("should_return_a_error", async () => {
    const file = new File([], "foto.png");
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
