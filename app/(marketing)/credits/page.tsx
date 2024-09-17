import { PageHeader } from '@/components/PageHeader';

export default async function Credits() {
  return (
    <div>
      <PageHeader>Credits</PageHeader>
      <br />
      <p>Thank you to the following people for the assets used on Tattoo Trade:</p>
      <ul className="list-disc ml-5">
        <li>profile by icongeek from <a href="https://thenounproject.com/browse/icons/term/profile/" target="_blank" title="profile Icons">Noun Project</a> (CC BY 3.0)</li>
      </ul>
    </div>
  )
}