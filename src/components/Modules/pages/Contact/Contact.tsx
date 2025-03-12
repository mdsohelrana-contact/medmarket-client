"use client"
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import Image from 'next/image'
import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e:any) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Here, you would typically handle form submission (e.g., send data to an API)
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    }, 1500)
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
       

        {/* Contact Info Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <Card className="transition-all">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                <FaMapMarkerAlt className="inline-block mr-2 text-blue-600" />
                Our Location
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                123, Medicine Street, E-Commerce City, Country
              </p>
            </CardContent>
          </Card>

          <Card className=" transition-all">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                <FaPhoneAlt className="inline-block mr-2 text-blue-600" />
                Phone
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">+1 234 567 890</p>
            </CardContent>
          </Card>

          <Card className=" transition-all">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                <FaEnvelope className="inline-block mr-2 text-blue-600" />
                Email
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">support@yourmedstore.com</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white text-center">
            Send Us a Message
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 text-center">
            Have any questions or need support? Drop us a message, and we'll get back to you as soon as possible.
          </p>

          <div className="mt-8 flex justify-center">
            <form onSubmit={handleSubmit} className="w-full sm:w-2/3 md:w-1/2 space-y-6">
              <div className="flex space-x-4">
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full"
                />
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  type="email"
                  required
                  className="w-full"
                />
              </div>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={4}
                required
                className="w-full"
              />
              <div className="text-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 w-full"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </form>
          </div>
        </div>

      
      </div>
    </div>
  )
}

export default Contact
