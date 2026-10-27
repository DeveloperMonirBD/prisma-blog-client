import CreateBlogFormServer from "@/components/modules/user/createBlog/CreateBlogFormServer";
import { blogService } from "@/services/blog.service";
import { Blog } from "@/types";

export default async function CreateBlogPage() {

    const { data } = await blogService.getBlogs();
    console.log(data)

    return (
        <div>
            <CreateBlogFormServer />

            {data?.map((item : Blog) => (
                <p key={item.id}>{item.title}</p>
            ))}
        </div>
    );
}
