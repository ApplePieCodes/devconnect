import {createClient} from "@supabase/supabase-js";

const supabaseUrl = 'https://gwfvzlqqpmbkvpwzzmot.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3ZnZ6bHFxcG1ia3Zwd3p6bW90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2NzUyNjksImV4cCI6MjA2NzI1MTI2OX0.NNnEMLR-HBXaG7eGTZLQb39mt9Yz86Polj2mJT6zpE4"
export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getPostsOlderThan(timestamp: string, count: number): Promise<any[]> {
    var posts = []

    var {data, error} = await supabase.from('posts').select('*').order('posted', {ascending: false}).lt('posted', timestamp).limit(count);

    if (data) {
        data.forEach((post) => {
            posts.push(post)
        })
    }

    return posts;
}

export async function getLoggedInUserID(): Promise<string | undefined> {
    var {data} = await supabase.auth.getUser();
    if (data) {
        return data.user?.id;
    }
    return undefined;
}

export function getLevelColor(level: number): string {
    if (level >= 1_000_000) return 'text-green-500 text-glow-prophetic';   // prophetic codelord
    if (level >= 50000) return 'text-sky-400 text-glow-arch';       // arch codebender
    if (level >= 10000) return 'text-sky-400 text-glow-guilded';        // guilded codebender
    if (level >= 5000) return 'text-sky-400';        // codebender
    if (level >= 1500) return 'text-amber-300 text-glow-guilded';         // guilded artificer
    if (level >= 1000) return 'text-amber-300';         // artificer
    if (level >= 750) return 'text-rose-300 text-glow-guilded';         // guilded sage
    if (level >= 600) return 'text-rose-300';         // sage
    if (level >= 500) return 'text-red-400 text-glow-guilded-grandmaster'; // guilded grandmaster
    if (level >= 300) return 'text-red-400 text-glow-grandmaster'; // grandmaster
    if (level >= 200) return 'text-red-400';         // master
    if (level >= 150) return 'text-orange-300 text-glow-guilded';         // guilded expert
    if (level >= 100) return 'text-orange-300';         // expert
    if (level >= 50) return 'text-green-300';          // mentor
    if (level >= 40) return 'text-indigo-400';          // professional
    if (level >= 30) return 'text-rose-300';          // graduate
    if (level >= 20) return 'text-zinc-400';          // scholar
    if (level >= 10) return 'text-stone-300';         // learner
    return 'text-white';              // beginner
}

export function getRankText(level: number): string {
    if (level >= 1_000_000) return 'Prophetic Codelord';   // prophetic codelord
    if (level >= 50000) return 'Arch Codebender';       // arch codebender
    if (level >= 10000) return 'Guilded Codebender';        // guilded codebender
    if (level >= 5000) return 'Codebender';        // codebender
    if (level >= 1500) return 'Guilded Artificer';         // guilded artificer
    if (level >= 1000) return 'Artificer';         // artificer
    if (level >= 750) return 'Guilded Sage';         // guilded sage
    if (level >= 600) return 'Sage';         // sage
    if (level >= 500) return 'Guilded Grandmaster'; // guilded grandmaster
    if (level >= 300) return 'Grandmaster'; // grandmaster
    if (level >= 200) return 'Master';         // master
    if (level >= 150) return 'Guilded Expert';         // guilded expert
    if (level >= 100) return 'Expert';         // expert
    if (level >= 50) return 'Mentor';          // mentor
    if (level >= 40) return 'Professional';          // professional
    if (level >= 30) return 'Graduate';          // graduate
    if (level >= 20) return 'Scholar';          // scholar
    if (level >= 10) return 'Learner';         // learner
    return 'Beginner';              // beginner
}