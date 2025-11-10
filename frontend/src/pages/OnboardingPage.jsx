import { useState, useRef } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon, UploadIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    college: authUser?.college || "",
    branch: authUser?.branch || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },

    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const colors = ['FF6B6B', '4ECDC4', '45B7D1', 'FFA07A', '98D8C8', 'F7DC6F', 'BB8FCE', '85C1E9'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(formState.fullName)}&background=${randomColor}&color=fff&size=200&font-size=0.6`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Create object URL for preview
    const imageUrl = URL.createObjectURL(file);
    setFormState({ ...formState, profilePic: imageUrl });
    toast.success("Profile picture uploaded successfully!");
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <Card className='w-full max-w-3xl shadow-xl'>
        <CardHeader>
          <CardTitle className='text-2xl sm:text-3xl text-center'>Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent className='p-6 sm:p-8'>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='flex flex-col items-center justify-center space-y-4'>
              <Avatar className='size-32'>
                <AvatarImage src={formState.profilePic} alt='Profile Preview' />
                <AvatarFallback>
                  <CameraIcon className='size-12 text-muted-foreground' />
                </AvatarFallback>
              </Avatar>

              <div className='flex items-center gap-2 flex-wrap justify-center'>
                <Button type='button' onClick={handleUploadClick}>
                  <UploadIcon className='size-4 mr-2' />
                  Upload from Device
                </Button>
                <Button type='button' onClick={handleRandomAvatar} variant='secondary'>
                  <ShuffleIcon className='size-4 mr-2' />
                  Generate Random Avatar
                </Button>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileUpload}
                className='hidden'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Full Name</label>
              <Input
                type='text'
                name='fullName'
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                placeholder='Your full name'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Bio</label>
              <textarea
                name='bio'
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                placeholder='Tell others about yourself'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-sm font-medium'>College</label>
                <Input
                  type='text'
                  name='college'
                  value={formState.college}
                  onChange={(e) => setFormState({ ...formState, college: e.target.value })}
                  placeholder='e.g., IIT Bombay'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-sm font-medium'>Branch</label>
                <Input
                  type='text'
                  name='branch'
                  value={formState.branch}
                  onChange={(e) => setFormState({ ...formState, branch: e.target.value })}
                  placeholder='e.g., Computer Science'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium'>Location</label>
              <div className='relative'>
                <MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-muted-foreground' />
                <Input
                  type='text'
                  name='location'
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className='pl-10'
                  placeholder='City, Country'
                />
              </div>
            </div>

            <Button className='w-full' disabled={isPending} type='submit'>
              {!isPending ? (
                <>
                  <ShipWheelIcon className='size-5 mr-2' />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className='animate-spin size-5 mr-2' />
                  Onboarding...
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default OnboardingPage;