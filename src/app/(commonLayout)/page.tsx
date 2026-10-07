import { Button } from '@/components/ui/button';
import { blogService } from '@/services/blog.service';

export default async function Home() {
    const { data, meta, error } = await blogService.getBlogs();

    console.log('Posts data:', data, 'Meta:', meta, 'Error:', error);

    return (
        <div className="container">
            {/* {data?.user ? <h1>Welcome , {data.user.name}</h1> : <h1>Welcome, Guest</h1>} */}

            <Button variant="outline">Click Here</Button>
        </div>
    );
}
