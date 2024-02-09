import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// type FormFields = {
//     email: string;
//     password: string;
// };

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().email(),
});

type FormFields = z.infer<typeof formSchema>;

const App = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormFields>({
        defaultValues: {
            email: "email@email.com",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            console.log(data);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            throw new Error();
        } catch (error) {
            setError("root", {
                message: "505 Sorry",
            });
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="p-10 text-xl">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 form min-w-[200px]"
                >
                    {errors.root?.message && (
                        <div className="text-red-500">
                            {errors.root?.message}
                        </div>
                    )}
                    <input
                        {...register("email")}
                        type="text"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <div className="text-red-500">
                            {errors.email.message}
                        </div>
                    )}
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                    />
                    {errors.password && (
                        <div className="text-red-500">
                            {errors.password.message}
                        </div>
                    )}

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default App;
