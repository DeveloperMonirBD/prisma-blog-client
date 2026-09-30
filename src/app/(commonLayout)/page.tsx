import { Button } from '@/components/ui/button';
import { userService } from '@/services/user.service';

export default async function Home() {
    const { data, error } = await userService.getSession();

    if (error) {
        console.error('Session error:', error);
    }

    console.log(data);

    return (
        <div className="container">
            {data?.user ? <h1>Welcome , {data.user.name}</h1> : <h1>Welcome, Guest</h1>}

            <Button variant="outline">Click Here</Button>
        </div>
    );
}
